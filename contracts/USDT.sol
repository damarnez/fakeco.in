pragma solidity 0.5.12;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20Mintable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/math/SafeMath.sol";

contract USDT is ERC20Mintable {
    using SafeMath for uint256;
    string public constant name = "USDT";
    string public constant symbol = "USDT";
    uint8 public constant decimals = 18;

    function mintTokens(address destinationAddress, uint256 amount) public {
        super.mint(destinationAddress, amount);
    }
}
