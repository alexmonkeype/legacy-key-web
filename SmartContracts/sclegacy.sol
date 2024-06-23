// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LegacyKey is Ownable(0x02e7520482045E2bA8a127C5d0D6E40a17024127), ReentrancyGuard{
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    IERC20Metadata usdt;
    address public adLegacy;
    uint256 public id;
    uint256 public amountPay;
    uint256 public decUSDT;
    uint256 public percent=6;

    modifier onlyWitnessPermit(uint _count) {
        require(!deathWitness[msg.sender][_count].permit,"No permit");
        _;
    }

    modifier onlyHeirPermit(uint _count) {
        require(!heirDetail[msg.sender][_count].permit,"No permit");
        _;
    }

    struct Book {
        uint256 id;       
        address[] hijos;
        address[] validador;
        uint256 sign;
        uint256 validTime;        
        uint saldo;          
    }

    struct witness{
        bool permit;
        address padre;
    }

    struct heir{
        bool permit;
        address padre;
        uint256 amount;
    }
    mapping (uint256 => Book) public padre;
    mapping (address => uint) public memberID;
    mapping (address => uint) public witnessCount;
    mapping (address => mapping (uint256 => witness)) public deathWitness;
    mapping (address => uint) public heirCount;
    mapping (address => mapping (uint256 => heir)) public heirDetail;

    constructor(address _adLegacy, IERC20Metadata _usdt) {
        adLegacy=_adLegacy;
        usdt=_usdt;
        decUSDT=10**_usdt.decimals();
    }

    function payLegacy () external{
        usdt.transferFrom(msg.sender, adLegacy, amountPay);
    }

    function setAmountPay(uint256 _amount) external onlyOwner { // PAGO UNICO 
        amountPay=_amount*decUSDT;
    }

    function newMember(address[] memory _hijos, address[] memory _validador, uint256 _amount, uint256 _time) 
    external nonReentrant{
        id=id.add(1);
        memberID[msg.sender]=id;
        padre[id]=Book(id,_hijos,_validador,0,_time,_amount.mul(decUSDT));
        for (uint i=0;i<_validador.length;i++){
            address _witness=_validador[i];
            uint256 _count=witnessCount[_witness].add(1);
            deathWitness[_witness][_count].padre=msg.sender;
        }
        for (uint i=0;i<_hijos.length;i++){
            address _son=_hijos[i];
            uint256 _count=heirCount[_son].add(1);
            heirDetail[_son][_count].padre=msg.sender;           
        }
        usdt.transferFrom(msg.sender, adLegacy, _amount.mul(decUSDT));     
    }

    function voteValidador( uint _count) external onlyWitnessPermit(_count) {
        deathWitness[msg.sender][_count].permit=true;
        require(deathWitness[msg.sender][_count].padre!=address(0),"Wrong ID");
        uint _id=memberID[deathWitness[msg.sender][_count].padre];        
        padre[_id].sign=padre[_id].sign.add(1);
    }

    function withdrawHeir(uint _count) external onlyHeirPermit(_count){
        heirDetail[msg.sender][_count].permit=true;
        address _address=heirDetail[msg.sender][_count].padre;
        uint _id=memberID[_address];
        Book storage father=padre[_id];
        uint _heirs=father.hijos.length;
        require(father.sign>_heirs.div(2),"You still can't collect his inheritance");
        uint _amount=father.saldo.mul(100+percent).div(100);        
        usdt.transferFrom(adLegacy,msg.sender,_amount.div(_heirs));
    }

}