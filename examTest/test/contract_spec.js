// /*global contract, config, it, assert*/

const Foo = require('Embark/contracts/Foo');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  //deployment: {
  //  accounts: [
  //    // you can configure custom accounts with a custom balance
  //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
  //  ]
  //},
  contracts: {
    "Foo": {
      
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("Foo", function () {
  this.timeout(0);
  it("Contract has been deployed", async function(){
    let address = await Foo.options.address;
    assert.ok(address);

  })

  it("you must be owner to call the function", async function() {

    await foo.methods.baz(3).send({
      from: accounts[0]
    });
    let currentState = await Lab3PersonalAccounting.methods
      .currentState()
      .call();
    assert.equal(currentState, 1);
  });

  it("Others cannot call this function", async function() {
    try {
      await Foo.methods.baz(3).send({
        from: accounts[1]
      });
    }
    catch(error) {
      assert.ok(error.message.includes("require owner = msg.sender"))
    }
  });

  

})

