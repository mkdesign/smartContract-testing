// /*global contract, config, it, assert*/

const Lab3PersonalAccounting = require("Embark/contracts/Lab3PersonalAccounting");

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config(
  {
    //deployment: {
    //  accounts: [
    //    // you can configure custom accounts with a custom balance
    //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
    //  ]
    //},
    contracts: {
      Lab3PersonalAccounting: {}
    }
  },
  (_err, web3_accounts) => {
    accounts = web3_accounts;
  }
);

contract("Lab3PersonalAccounting", function() {
  this.timeout(0);

  it("Lab3PersonalAccounting was deployed", async () => {
    let address = await Lab3PersonalAccounting.options.address;
    assert.ok(address);
    let balance = await Lab3PersonalAccounting.methods.getBalance().call();
    assert.equal(balance, 0);

    let currentState = await Lab3PersonalAccounting.methods
      .currentState()
      .call();
    console.log(balance, currentState);
    assert.equal(currentState, 0);
  });

  it("askCredit function not working correctly", async function() {
    await Lab3PersonalAccounting.methods.askCredit(5).send();
    let balance = await Lab3PersonalAccounting.methods.balance().call();
    assert.equal(balance, -5);
  });

  it("payCredit function not working correclty", async function() {
    await Lab3PersonalAccounting.methods.payCredit(5).send();
    let balance = await Lab3PersonalAccounting.methods.balance().call();
    assert.equal(balance, 0);
  });

  it("your state should be ZERO", async function() {
    let currentState = await Lab3PersonalAccounting.methods
      .currentState()
      .call();
    assert.equal(currentState, 0);
  });

  it("your state should be DEBTOR", async function() {
    let balance = await Lab3PersonalAccounting.methods.balance().call();
    console.log(balance, "for debtor 1");

    await Lab3PersonalAccounting.methods.askCredit(15).send();
    balance = await Lab3PersonalAccounting.methods.balance().call();
    console.log(balance, "for debtor 2");
    await Lab3PersonalAccounting.methods.changeState().send();
    let currentState = await Lab3PersonalAccounting.methods
      .currentState()
      .call();
    console.log(currentState);
    assert.equal(currentState, 1);
  });

  it("your state should be CREDITOR", async function() {
    let balance = await Lab3PersonalAccounting.methods.balance().call();
    console.log(balance);
    await Lab3PersonalAccounting.methods.payCredit(25).send();
    balance = await Lab3PersonalAccounting.methods.balance().call();
    console.log(balance, "for creditor");
    await Lab3PersonalAccounting.methods.changeState().send();
    let currentState = await Lab3PersonalAccounting.methods
      .currentState()
      .call();
    assert.equal(currentState, 2);
  });

  it("your state should be ZERO", async function() {
    await Lab3PersonalAccounting.methods.askCredit(10).send();
    let balance = Lab3PersonalAccounting.methods.balance().call();
    console.log(balance);
    await Lab3PersonalAccounting.methods.changeState().send();
    let currentState = await Lab3PersonalAccounting.methods
      .currentState()
      .call();
    assert.equal(currentState, 0);
  });

  it("you must be owner to call the function", async function() {
    await Lab3PersonalAccounting.methods.askCredit(10).send();
    await Lab3PersonalAccounting.methods.changeState().send({
      from: accounts[0]
    });
    let currentState = await Lab3PersonalAccounting.methods
      .currentState()
      .call();
    assert.equal(currentState, 1);
  });

  it("Others cannot call this function", async function() {
    await Lab3PersonalAccounting.methods.changeState().send({
      from: accounts[1]
    });
    assert.notEqual(accounts[1], accounts[0]);
  });
});
