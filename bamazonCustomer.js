var mysql = require("mysql");
var inquirer = require("inquirer");
var cTab = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    console.log("Welcome to Bamazon.com, like that other site but not...")
    connection.query("SELECT item_id as 'Item ID.', product_name as Product, CONVERT(price,char) as Price \
                      FROM products \
                      WHERE stock_quantity>0;", function (err, results) {
            console.table(results)

            inquirer
                .prompt([
                    {
                        name: "item",
                        type: "input",
                        message: "Enter the ID of the item you would like to buy.",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    },
                    {
                        name: "quantity",
                        type: "input",
                        message: "What quantity would you like?",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }
                ])
                .then(function (answer) {
                    // when finished prompting, insert a new item into the db with that info
                    connection.query(
                        "SELECT price,stock_quantity FROM products WHERE ?",
                        {
                            item_id: answer.item,
                        },
                        function (err, results) {
                            if (err) throw err;

                            var chosenItem;
                            for (var i = 0; i < results.length; i++) {
                                if (results[i].item_name === answer.choice) {
                                    chosenItem = results[i];
                                }
                            }

                            

                            if (answer.quantity > chosenItem.stock_quantity) {
                                console.log("Sorry, we only have " + chosenItem.stock_quantity + " of those in stock. \n");
                                start();
                            }
                            else {
                            
                            var totalPrice = chosenItem.price * answer.quantity
                            var newQuantity = chosenItem.stock_quantity - answer.quantity
                            
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                  {
                                    stock_quantity: newQuantity
                                  },
                                  {
                                    item_id: answer.item
                                  }
                                ],
                                function(error) {
                                  if (error) throw err;
                                }
                              );
                            
                            console.log("Your total today comes out to: $" + totalPrice.toFixed(2) + "\n");
                            inquirer
                                .prompt([
                                    {
                                        name: "continue",
                                        type: "list",
                                        message: "Would you like to make another purchase?",
                                        choices: ["Yes", "No"]
                                    }
                                ])
                                .then(function (answer) {
                                    // based on their answer, either call the bid or the post functions
                                    if (answer.continue === "Yes") {
                                        start();
                                    }
                                    else {
                                        connection.end();
                                        return;
                                    }
                                });
                            }
                        }
                    );
                });
        });
}

