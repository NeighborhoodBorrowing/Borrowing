INSERT INTO members (firstName, lastName, email, password, zipCode) VALUES
("Fatima", "Ahmed", "fa@a.com", "12345", "76040"),
("Hermione", "Granger", "hg@b.com", "abcde", "76040"),
("John", "Walks", "jw@c.com", "abc12", "75062"),
("Jasmine", "McFee", "jm@a.com", "67891", "69010"),
("Happy", "Gilmore", "hg@a.com", "00000", "76040"),
("Paris", "Hilton", "ph@a.com", "11111", "76040"),
("Your", "Mom", "sym@a.com", "22222", "76040"),
("Chad", "Matthews", "cm@a.com", "33333", "76040"),
("Jenine", "Lalo", "jl@a.com", "44444", "76040"),
("Vin", "Simms", "vs@a.com", "55555", "76040");

INSERT INTO categories (categoryName, id, parentId) values
("Cleaning Supplies",300, 0),
("Brooms",301, 300),
("Vaccum Cleaners", 302, 300),
("Other", 399, 300),

("Cooking Equipment", 600, 0),
("Dinnerware", 601, 600),
("Grilling", 602, 600),
("Kitchen Appliances", 603, 600),
("Pots and Pans", 604, 600),
("Other", 699, 600),


("Electronics", 800, 0),
("CD/DVD Players", 801, 800),
("Computers", 802, 800),
("Gaming", 803, 800),
("TVs", 804, 800),
("Other", 899, 800),

("Entertainment", 900, 0),
("Board Games", 901, 900),
("CDs", 902, 900),
("DVDs", 903, 900),
("Gaming", 904, 900),
("Sporting Equipment", 905, 900),
("Toys", 906, 900),
("Other", 999, 900),

("Garden and Outdoors", 1000, 0),
("Gardening Tools", 1001,1000),
("Outdoor Power Equipment", 1002,1000),
("Other", 1099,1000),

("Tools", 1100, 0),
("Drills", 1101, 1100),
("Hammers", 1102, 1100),
("Saws", 1103, 1100),
("Screwdrivers", 1104, 1100),
("Other", 1199, 1100);


INSERT INTO memberItems (name, description, picture, value, categoryId, ownerId ) values
("Stanley STHT51304 Hammer", "Stanley STHT51304 20Oz Rip Claw Fiberglass Hammer"
, "https://images-na.ssl-images-amazon.com/images/I/41qM9ujhD%2BL._AC_UL160_SR160,160_.jpg"
, 12.99, 1102, (Select id from Members where email="fa@a.com")),

("DEWALT Cordless", "DEWALT DC825B 1/4-Inch 18-Volt Cordless Impact Driver"
, "https://images-na.ssl-images-amazon.com/images/I/61hdpi68FDL._SL1000_.jpg"
, 98, 1101, (Select id from Members where email="fa@a.com")),

("Compact DVD Player", "Craig Compact DVD/JPEG/CD-R/CD-RW/CD Player with Remote"
, "https://images-na.ssl-images-amazon.com/images/I/61jIRy8PKLL._SL1000_.jpg"
, 31.05, 801, (Select id from Members where email="jw@c.com")),

("Ryobi Power Drill", "Ryobi 18-Volt ONE+ Lithium-Ion power drill with adjustable torque output."
, "https://images.homedepot-static.com/productImages/b11fb749-bdd8-4249-94c1-12bea4917a40/svn/ryobi-drill-drivers-p1810-64_1000.jpg"
, 69.00, 1101, (Select id from Members where email="jw@c.com")),

("Vitamix Blender", "Vitamix 5200 blender. 64 punce container, variable speed control. Makes hot soup in six minutes from cold ingredients."
, "https://www.vitamix.com/media/catalog/product/5200compact/images/CS-rglam-black.jpg"
, 450.00, 603, (Select id from Members where email="jw@c.com")),

("Four (4) Slice Toaster", "Black and Decker four slice stainless steel toaster."
, "https://target.scene7.com/is/image/Target/50939783?wid=1400"
, 40.00, 603, (Select id from Members where email="jw@c.com")),

("One Touch Can Opener", "Hamilton Beach 76606ZA Smooth Touch Can Opener, Black and Chrome."
, "https://images-na.ssl-images-amazon.com/images/I/81-yVi1cXDL._SL1500_.jpg"
, 29.92, 603, (Select id from Members where email="jw@c.com")),

("Hand Mixer", "KitchenAid® 5-Speed Hand Mixer"
, "https://target.scene7.com/is/image/Target/14205267?wid=1400"
, 29.99, 603, (Select id from Members where email="jw@c.com"));

INSERT INTO borroweditems (borrowedStatus, borrowedDate, dueDate, returnDate, itemId, borrowerId)
VALUES (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, null,1,2);

INSERT INTO borroweditems (borrowedStatus, borrowedDate, dueDate, returnDate, itemId, borrowerId)
VALUES (0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, null,1,3);
