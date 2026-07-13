// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title CustomerStorage
 * @author Revito Manuel Hasudungan Manik
 * @notice Smart Contract untuk menyimpan data preferensi pelanggan
 *         restoran fine dining berbasis Ethereum.
 */
contract CustomerStorage {

    /*//////////////////////////////////////////////////////////////
                            CUSTOM ERRORS
    //////////////////////////////////////////////////////////////*/

    error CustomerNotFound();
    error CustomerAlreadyExists();
    error InvalidCustomerData();

    /*//////////////////////////////////////////////////////////////
                                STRUCT
    //////////////////////////////////////////////////////////////*/

    struct Customer {
        uint256 customerId;
        string fullName;
        string phoneNumber;
        string favoriteMenu;
        string foodAllergies;
        string specialNotes;
        uint256 createdAt;
        uint256 updatedAt;
        bool exists;
    }

    struct Transaction {
        uint256 transactionId;
        string menuItems;
        uint256 totalPrice;
        string specialRequest;
        uint256 transactionDate;
    }

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 private customerCount;
    uint256 private transactionCount;

    mapping(uint256 => Customer) private customers;

    mapping(uint256 => Transaction[]) private customerTransactions;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event CustomerCreated(
        uint256 indexed customerId,
        string fullName
    );

    event CustomerUpdated(
        uint256 indexed customerId
    );

    event TransactionAdded(
        uint256 indexed customerId,
        uint256 indexed transactionId
    );

    /*//////////////////////////////////////////////////////////////
                                MODIFIER
    //////////////////////////////////////////////////////////////*/

    modifier customerExists(uint256 customerId) {
        if (!customers[customerId].exists) {
            revert CustomerNotFound();
        }
        _;
    }

}