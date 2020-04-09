pragma solidity 0.5.12;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20Mintable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/math/SafeMath.sol";
// Mainnet: https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7

contract USDT is ERC20 {
    using SafeMath for uint256;
    string public constant name = "USDT";
    string public constant symbol = "USDT";
    uint8 public constant decimals = 6;

   function mintTokens(address destinationAddress, uint256 _amount) public  returns (bool){
        _mint(destinationAddress, _amount);
        return true;
    }
}
