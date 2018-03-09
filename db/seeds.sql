INSERT INTO Members (firstName, lastName, email, password, zipCode) VALUES
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

INSERT INTO Categories (categoryName, id, parentId) values
("Cleaning Supplies",300, 0),
("Brooms",301, 300),
("Mops", 302, 300),
("Sprays and Wipes", 303, 300),
("Vacuum Cleaners", 304, 300),
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
("Gaming Consoles", 803, 800),
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


INSERT INTO MemberItems (name, description, picture, value, categoryId, ownerId ) values
("Stanley STHT51304 Hammer", "Stanley STHT51304 20Oz Rip Claw Fiberglass Hammer"
, "https://images-na.ssl-images-amazon.com/images/I/41qM9ujhD%2BL._AC_UL160_SR160,160_.jpg"
, 12.99, 1102, (Select id from Members where email="fa@a.com")),

("DEWALT Cordless", "DEWALT DC825B 1/4-Inch 18-Volt Cordless Impact Driver"
, "https://images-na.ssl-images-amazon.com/images/I/61hdpi68FDL._SL1000_.jpg"
, 98, 1101, (Select id from Members where email="fa@a.com")),

("iRobot Roomba Vacuum Cleaner", "iRobot Roomba 690 Wi-Fi® Connected Vacuuming Robot"
, "https://target.scene7.com/is/image/Target/52360762?wid=1400"
, 318, 304, (Select id from Members where email="fa@a.com")),

("Upright Vacuum Cleaner", "Dirt Devil Pro Power™ Bagless Upright Vacuum- UD70172"
, "https://target.scene7.com/is/image/Target/11301939?wid=1400"
, 53.99, 304, (Select id from Members where email="fa@a.com")),

("Wood Handle Shovel", "48 in. Wood Handle Round Point Shovel"
, "https://images.homedepot-static.com/productImages/f6245d72-0c10-4793-8d75-ebe57dfdcdea/svn/ames-shovels-2535600-64_1000.jpg", 15, 1001, (Select id from Members where email="fa@a.com")),

("Gas Powered Lawn Mower", "21 in. 3-in-1 Variable Speed Gas Walk Behind Self Propelled Lawn Mower with Auto Choke"
, "https://images.homedepot-static.com/productImages/549c9e56-1e17-4e23-9c7a-62274702346a/svn/honda-self-propelled-lawn-mowers-hrr216vka-64_1000.jpg", 400, 1002, (Select id from Members where email="fa@a.com")),

("Battery Powered Leaf Blower", "DEWALT 90 MPH 400 CFM 20-Volt MAX Lithium-Ion Cordless Handheld Leaf Blower with 5.0Ah Battery and Charger Included"
, "https://images.homedepot-static.com/productImages/a56701ff-16f7-424d-8289-381aa8f1559d/svn/dewalt-leaf-blowers-dcbl720p1-64_1000.jpg", 199, 1002, (Select id from Members where email="fa@a.com")),

("Cordless String Trimmer (Weed Eater, Lawn Edger)"
 , "4BLACK+DECKER 13 in. 40-Volt MAX Lithium-Ion Cordless 2-in-1 String Grass Trimmer/Lawn Edger with 1.5 Ah Battery and Charger Included", "https://images.homedepot-static.com/productImages/6d59dc9e-581e-433a-ab16-e6c3ba79e3f6/svn/black-decker-cordless-string-trimmers-lst136-64_1000.jpg"
 , 149, 1002, (Select id from Members where email="fa@a.com")),

("Gardening Gloves", "Digz Women's Medium/Large Nitrile Coated Gloves"
 , "https://images.homedepot-static.com/productImages/1224b565-222b-4ce1-b974-703b8528e120/svn/multi-digz-gardening-gloves-77881-024-64_1000.jpg"
 , 5, 1001, (Select id from Members where email="fa@a.com")),

("Hand Tiller", "Ames Stand-Up Garden Tiller"
 , "https://images.homedepot-static.com/productImages/38b3471e-8fed-40e1-aa6a-22b345cde802/svn/ames-cultivators-2917100-64_1000.jpg"
 , 25.98, 1001, (Select id from Members where email="fa@a.com")),

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
, 29.99, 603, (Select id from Members where email="jw@c.com")),

("The Elder Scrolls V: Skyrim for Nintendo Switch", "Return to the snowy, dragon-ridden mountains of Skyrim and save the world - but this time on Nintendo's portable console."
, "https://www.gamestop.com/common/images/lbox/141780b.jpg"
, 60, 904, (Select id from Members where email="jw@c.com")),

("The Legend of Zelda: Breath of the Wild for Nintendo Switch", "Breath of the Wild is a feat of design and polish. Hyrule feels like a real place, and the journey Link and Zelda undertake to defeat Ganon is compelling."
, "https://www.gamestop.com/common/images/lbox/141686b.jpg"
, 60, 904, (Select id from Members where email="jw@c.com")),

("Mario Kart 8 Deluxe for Nintendo Switch", "With multiple new additions and important improvements, Mario Kart 8 Deluxe is the definitive version of one of the Wii U's best games."
, "https://www.gamestop.com/common/images/lbox/141784b.jpg"
, 60, 904, (Select id from Members where email="jw@c.com")),

("The Witcher III: Wild Hunt Complete Edition for PS4", "Become a professional monster slayer and embark on an adventure of epic proportions."
, "https://www.gamestop.com/common/images/lbox/128348b.jpg"
, 60, 904, (Select id from Members where email="jw@c.com")),

("Grand Theft Auto V for PS4", "A young street hustler, a retired bank robber and a terrifying psychopath must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other."
, "https://www.gamestop.com/common/images/lbox/102048b.jpg"
, 60, 904, (Select id from Members where email="jw@c.com")),

("Resident Evil 7 Biohazard Gold Edition for PS4", "Resident Evil®7 biohazard sets a new course for the Resident Evil series as it leverages its roots and opens the door to a truly terrifying horror experience."
, "https://www.gamestop.com/common/images/lbox/155491b.jpg"
, 60, 904, (Select id from Members where email="jw@c.com")),

("Resident Evil 7 Biohazard Gold Edition for PS4", "Resident Evil®7 biohazard sets a new course for the Resident Evil series as it leverages its roots and opens the door to a truly terrifying horror experience."
, "https://www.gamestop.com/common/images/lbox/155491b.jpg"
, 60, 904, (Select id from Members where email="vs@a.com")),

("Spin Mop and Bucket", "O-Cedar EasyWring Microfiber Floor Cleaning System"
, "https://images-na.ssl-images-amazon.com/images/I/71%2BHFuZzTyL._SL1500_.jpg"
, 29.97, 302, (Select id from Members where email="vs@a.com")),

("Swiffer Dry Sweeping Pad Refills", "Swiffer Sweeper Dry Sweeping Pad Refills for Floor Mop, Refill Cloth with Febreze Lavender Vanilla & Comfort Scent"
, "https://images-na.ssl-images-amazon.com/images/I/81tVCCW-7xL._SL1500_.jpg"
, 0, 303, (Select id from Members where email="vs@a.com")),

("Clorox Disinfecting Wipes", "Clorox Disinfecting Wipes"
, "https://images-na.ssl-images-amazon.com/images/I/81SdtHjcwyL._SL1300_.jpg"
, 0, 303, (Select id from Members where email="vs@a.com")),

("Resuable Lint Roller", "iLifeTech Resuable Lint Roller Cat Dog Hair Remover Tool Pet Shedding Brush Cleans your Suit/Sofa "
, "https://images-na.ssl-images-amazon.com/images/I/61dvi3jgVOL._SL1500_.jpg"
, 10.99, 399, (Select id from Members where email="vs@a.com")),

("Magic Lint Brush Pet Hair Remover Clothing with Swivel", "Measures approximately 11in long, Swivel head to reverse direction for lint and hair removal, Deep Cleaning Brush Removes Fuzz and Pilling,   Quickly and effectively removes lint, dust, dandruff and pet hair from clothing, bedding and upholstery"
, "https://images-na.ssl-images-amazon.com/images/I/61j8sBnem1L._SL1000_.jpg"
, 6.99, 399, (Select id from Members where email="vs@a.com"))



;



INSERT INTO BorrowedItems (borrowedStatus, borrowedDate, dueDate, returnDate, itemId, borrowerId)
VALUES (2, null, null, null,1,2),
(0, null, null, null,2,3),
(-1, null, null, null,5,3),
(-1, null, null, null,6,3),
(3, null, null, null,7,3);
