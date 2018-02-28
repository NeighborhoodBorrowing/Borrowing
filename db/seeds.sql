INSERT INTO members (firstName, lastName, email, password, zipCode) VALUES
("Fatima", "Ahmed", "fa@a.com", "12345", "76040"),
("Hermione", "Granger", "hg@b.com", "abcde", "76040"),
("John", "Walks", "jw@c.com", "abc12", "75062"),
("Person", "Someone", "someone@b.com", "34567", "69010");

INSERT INTO categories (categoryName, id, parentId) values
("Cleaning Supplies",300, 0),
("Broom",301, 300),
("Mop",302, 300),
("Vaccum Cleaner", 303, 300),
("Other", 399, 300),

("Cooking Equipment", 600, 0),
("Dinnerware", 601, 600),
("Grill", 602, 600),
("Pots and Pans", 603, 600),


("Electronics",800, 0),
("DVD Players", 801, 800),
("TV", 802, 800),

("Entertainment", 900, 0),
("Board Games",901, 900),
("CDs", 902, 900),
("DVDs", 903, 900),
("Gaming System", 904, 900),
("Sporting Equipment", 905, 900),
("Toys", 906, 900),
(	"Other", 999, 900),

("Garden and Outdoors",1000, 0),
("Hedge Trimmers", 1001,1000),
("Hose",1002,1000),
("Lawn Mower",1003,1000),
("Rake",1004,1000),
("Shovel",1005,1000),
("Wheel Barrow",1006,1000),
("Other",1099,1000),

("Tools",1100, 0),
("Drill",1101,1100),
("Saw", 1102,1100),
("Screwdriver",1103,1100),
("Hammer",1104,1100),
("Other",1199,1100);


INSERT INTO memberItems (name, description, picture, value, categoryId, ownerId ) values
("Stanley STHT51304 Hammer", "Stanley STHT51304 20Oz Rip Claw Fiberglass Hammer"
, "https://images-na.ssl-images-amazon.com/images/I/41qM9ujhD%2BL._AC_UL160_SR160,160_.jpg"
, 12.99, 1104, (Select id from Members where email="fa@a.com")),

("DEWALT Cordless", "DEWALT DC825B 1/4-Inch 18-Volt Cordless Impact Driver"
, "https://images-na.ssl-images-amazon.com/images/I/61hdpi68FDL._SL1000_.jpg"
, 98, 1101, (Select id from Members where email="fa@a.com")),

("Compact DVD Player", "Craig Compact DVD/JPEG/CD-R/CD-RW/CD Player with Remote"
, "https://images-na.ssl-images-amazon.com/images/I/61jIRy8PKLL._SL1000_.jpg"
, 31.05, 801, (Select id from Members where email="jw@c.com"))

;
