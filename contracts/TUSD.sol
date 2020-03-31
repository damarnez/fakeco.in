pragma solidity 0.5.12;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20Mintable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/math/SafeMath.sol";

contract TUSD is ERC20 {
    using SafeMath for uint256;
    string public constant name = "TUSD";
    string public constant symbol = "TUSD";
    uint8 public constant decimals = 18;

   function mintTokens(address destinationAddress, uint256 _amount) public  returns (bool){
        _mint(destinationAddress, _amount);
        return true;
    }
}
