pragma solidity 0.5.12;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/math/SafeMath.sol";
// Mainnet: https://etherscan.io/token/0x8e870d67f660d95d5be530380d0ec0bd388289e1

contract PAX is ERC20 {
    using SafeMath for uint256;
    string public constant name = "PAX";
    string public constant symbol = "PAX";
    uint8 public constant decimals = 18;

   function mintTokens(address destinationAddress, uint256 _amount) public  returns (bool){
        _mint(destinationAddress, _amount);
        return true;
    }
}
