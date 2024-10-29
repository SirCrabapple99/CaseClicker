// CSGOClicker - Case CSGOClicker
//money, inventory, jackpot
(function () {
	var itemCounter = 0;
	var fps = 15;

	var money = 7.50;
	var username = localStorage.getItem('username');
	if (localStorage.getItem("username") === null) {
		localStorage.setItem('username', "Player 1 (You)")
	}
	var useravatar = localStorage.getItem('imgData');
	if (localStorage.getItem("imgData") === null) {
		localStorage.setItem("imgData", "https://i.imgur.com/ICK2lr1.jpg")
	}

	var currentCase = "case1";
	var acceptMoneyPerClick = 0.1;

	
	/*===============STATISTICS===============*/
	var totalMoneySpent = 0;
	var totalCasesOpened = 0;
	var totalBluesOpened = 0;
	var totalPurplesOpened = 0;
	var totalPinksOpened = 0;
	var totalRedsOpened = 0;
	var totalKnivesOpened = 0;


	/*===============LOGIC===============*/

	function beatboy() {
		money += 5000;
		inventoryMax += 200
		stackingUpgradesPurchased['upgrade1'] += 200;
	};

	//cases -> case# -> rarity  -> weaponname, price, img
	//cases -> case1 -> milspec -> weap1.name

	//blues = 70%, purple = 20%, pink = 5%, red = 2.50%, knife = 0.50%

	var rarityValue = {
		milspec: 0.75,
		restricted: 0.92,
		classified: 0.97,
		stattrak: 0.98,
		covert: 0.995
	};

	function randSkin() {
		var skinsArray = [];
		var randSkin = "";
		var randNum = Math.random().toFixed(3); //rounded to 3 places to make it slightly easier to get certain rarities
		var rarity = "";
		var identifier;

		if (randNum <= rarityValue.milspec) {
			rarity = "milspec";
		} else if (randNum >= rarityValue.milspec && randNum <= rarityValue.restricted) {
			rarity = "restricted";
		} else if (randNum >= rarityValue.restricted && randNum <= rarityValue.classified) {
			rarity = "classified";
		} else if (randNum >= rarityValue.classified && randNum <= rarityValue.stattrak) {
			rarity = "stattrak";
		} else if (randNum >= rarityValue.stattrak && randNum <= rarityValue.covert) {
			rarity = "covert";
		} else {
			rarity = "knife";
		}

		function skinChoose(r) {
			if (r === "knife") {
				var knifeCase = "";
				if (currentCase === "case13") {
					knifeCase = "chroma";
				} else if (currentCase === "case13") {
					knifeCase = "chromast";
				} else if (currentCase === "case14") {
					knifeCase = "chroma";
				} else if (currentCase === "case14") {
					knifeCase = "chromast";
				} else if (currentCase === "case19") {
					knifeCase = "chroma";
				} else if (currentCase === "case19") {
					knifeCase = "chromast";
				} else if (currentCase === "case9") {
					knifeCase = "huntsman";
				} else if (currentCase === "case9") {
					knifeCase = "huntst";
				} else if (currentCase === "case10") {
					knifeCase = "butterfly";
				} else if (currentCase === "case10") {
					knifeCase = "butterst";
				} else if (currentCase === "case16") {
					knifeCase = "shadow";
				} else if (currentCase === "case16") {
					knifeCase = "shadowst";
				} else if (currentCase === "case15") {
					knifeCase = "falchion";
				} else if (currentCase === "case15") {
					knifeCase = "falchionst";
				} else if (currentCase === "case18") {
					knifeCase = "bowie";
				} else if (currentCase === "case18") {
					knifeCase = "bowiest";
				} else if (currentCase === "case20") {
					knifeCase = "gamma";
				} else {
					knifeCase = "regular";
				}

				skinsArray = Object.keys(knives[knifeCase]);

				randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];

				identifier = knives[knifeCase][randSkin];

				//console.log(identifier.name);
				//console.log(identifier.price);
				//console.log(identifier.img);
				var toEncode = "knives['" + knifeCase + "']" + "['" + randSkin + "']";
				inventory["item" + itemCounter] = window.btoa(toEncode);

				drawItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);

				if (popup) {
					caseModalDraw(identifier.name, identifier.img);
					$('.modalWindow').toggle();
				}

			} else {
				//console.log(r);
				skinsArray = Object.keys(cases[currentCase][r]);

				randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];

				identifier = cases[currentCase][r][randSkin];

				//console.log(identifier.name);
				//console.log(identifier.price);
				//console.log(identifier.img);
				var toEncode = "cases['" + currentCase + "']" + "['" + r + "']" + "['" + randSkin + "']";
				//console.log(toEncode);
				inventory["item" + itemCounter] = window.btoa(toEncode);
				//console.log(cases[currentCase][r][randSkin]);

				drawItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);

				if (popup) {
					caseModalDraw(identifier.name, identifier.img);
					$('.modalWindow').toggle();
				}


			}

			inventoryCurrent += 1;
			itemCounter += 1;
		}

		skinChoose(rarity);

	}

	function itemDisp(name, price, img) {
		var temp = [];

		temp.push(name, price, img);
		//console.log(temp);
		return temp;
	}

	function drawItem(array, rarity) {
		var name = array[0];
		var price = "$" + array[1].toFixed(2);
		var img = array[2] + "/70fx70f";

		$(".inventoryItemContainer").append('<div class="inventoryItem ' + rarity + '" id="' + 'item' + itemCounter + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
	}

	function inventoryClear() {
		inventory = {};
		$('.inventoryItemContainer').html("");
	}

	function drawInventory() {
		// I know this is cancer dont hate please
		var keys = Object.keys(inventory);

		for (var i = 0; i < keys.length; i++) {
			var rarity = atob(inventory[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
			if (rarity === "regular" || rarity === "butterst" || rarity === "falchionst" || rarity === "chromast" || rarity === "chroma" || rarity === "huntsman" || rarity === "gamma" || rarity === "huntst" || rarity === "butterfly" || rarity === "shadow" || rarity === "shadowst" || rarity === "bowie" || rarity === "bowiest" || rarity === "falchion") {
				rarity = "knife";
			}
			var item = eval(atob(inventory[keys[i]]));
			var name = item["name"];
			var price = "$" + item["price"].toFixed(2);
			var img = item["img"] + "/70fx70f";

			$(".inventoryItemContainer").append('<div class="inventoryItem ' + rarity + '" id="' + keys[i] + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
		}
	}




	/*===============CLICKS===============*/

	$(".inventoryItemContainer").on("click", ".inventoryItem", function () {
		if (inventory[this.id]) {
			$(".tooltipAnchor").hide();
			var item = eval(atob(inventory[this.id]));
			//console.log(item);
			if (menusound) {
				$('#menu')[0].play();
			}
			inventoryCurrent -= 1;
			money += (item['price']);
			//console.log(item['price']);
			delete inventory[this.id];
			$(this).remove();
			inventoryValue();
			skinOverflow();
		}
	});


	$("#case").click(function () {
		if (inventoryCurrent < inventoryMax) {
			var price = (operationCases[currentCase]["price"] - caseDiscount) + (keyPrice - keyDiscount);
			if (price >= 0 && money >= price) {
				money -= price;
				randSkin();
				if (unboxsound) {
					$('#unbox')[0].play();
				}
			} else if (price < 0 && money >= price) {
				randSkin();
			}
			inventoryValue();
		}
	});

	$(".jackpotDifficulty").click(function () {
		if (!jackpotInProgress) {
			$(".jackpotDifficultyContainer div").removeClass("active");
			$(this).addClass("active");
			jackpotDifficulty = this.id;
			if (menusound) {
				$('#menu')[0].play();
			}
		}
	});

	$(".modalMain").on("click", ".modalClose", function () {
		$('.modalWindow').toggle();
		if (menusound) {
			$('#menu')[0].play();
		}
	});

	$("#acceptButton").click(function () {
		money += acceptMoneyPerClick;
		if (acceptedsound) {
			$('#accepted')[0].play();
		}
	});

	$(".about").click(function () {
		$(".main").toggleClass("small");
		if (menusound) {
			$('#menu')[0].play();
		}
	});
	var username = localStorage.getItem('username');
	if (localStorage.getItem("username") === null) {
		localStorage.setItem('username', "Player 1 (You)")
	}
	var useravatar = localStorage.getItem('imgData');
	if (localStorage.getItem("imgData") === null) {
		localStorage.setItem("imgData", "https://i.imgur.com/ICK2lr1.jpg")
	}
	$(".profileavatar").html('<img src="' + useravatar + '" width="50" height="50">');
	$(".profile").html("Welcome " + username);

	/*===============TABS===============*/

	$("#caseTab").click(function () {
		if ($(".caseContainer").css('display') == 'none') {
			$(this).toggleClass("active");
			$("#jackpotTab").removeClass("active");
			$("#upgradeTab").removeClass("active");
			$("#inventoryTab").removeClass("active");
			$("#coinTab").removeClass("active");
			$("#newsTab").removeClass("active");
			$(".newsContainer").hide();
			$(".upgradeContainer").hide();
			$(".jackpotRightContainer").hide();
			$(".inventoryContainer").hide();
			$(".caseContainer").show();
			$(".coinContainer").hide();
			if (menusound) {
				$('#menu')[0].play();
			}
			$(".rightMain").css("bottom", "135px");
			$(".tradeButtonContainer").show();
			if ($(".unboxing").css('display') !== 'block') {
				$(".unboxing").show();
				$(".jackpot").hide();
			}
		}
	});

	$("#inventoryTab").click(function () {
		if ($(".inventoryContainer").css('display') == 'none') {
			$(this).toggleClass("active");
			$("#jackpotTab").removeClass("active");
			$("#upgradeTab").removeClass("active");
			$("#caseTab").removeClass("active");
			$("#coinTab").removeClass("active");
			$("#newsTab").removeClass("active");
			$(".newsContainer").hide();
			$(".upgradeContainer").hide();
			$(".jackpotRightContainer").hide();
			$(".inventoryContainer").show();
			$(".caseContainer").hide();
			$(".coinContainer").hide();
			if (menusound) {
				$('#menu')[0].play();
			}
			$(".rightMain").css("bottom", "135px");
			$(".tradeButtonContainer").show();
			if ($(".unboxing").css('display') !== 'block') {
				$(".unboxing").show();
				$(".jackpot").hide();
			}
		}
	});

	$("#upgradeTab").click(function () {
		if ($(".upgradeContainer").css('display') == 'none') {
			$(this).addClass("active");
			$("#jackpotTab").removeClass("active");
			$("#caseTab").removeClass("active");
			$("#inventoryTab").removeClass("active");
			$("#coinTab").removeClass("active");
			$("#newsTab").removeClass("active");
			$(".newsContainer").hide();
			$(".upgradeContainer").show();
			$(".jackpotRightContainer").hide();
			$(".inventoryContainer").hide();
			$(".caseContainer").hide();
			$(".coinContainer").hide();
			if (menusound) {
				$('#menu')[0].play();
			}
			$(".rightMain").css("bottom", "135px");
			$(".tradeButtonContainer").show();
			if ($(".unboxing").css('display') !== 'block') {
				$(".unboxing").show();
				$(".jackpot").hide();
			}
		}
	});

	$("#jackpotTab").click(function () {
		if (jackpotUnlocked) {
			if ($(".jackpotRightContainer").css('display') == 'none') {
				drawSwapInventory();
				$(this).addClass("active");
				$("#upgradeTab").removeClass("active");
				$("#caseTab").removeClass("active");
				$("#inventoryTab").removeClass("active");
				$("#coinTab").removeClass("active");
				$("#newsTab").removeClass("active");
				$(".newsContainer").hide();
				$(".upgradeContainer").hide();
				$(".jackpotRightContainer").show();
				$(".inventoryContainer").hide();
				$(".caseContainer").hide();
				$(".coinContainer").hide();
				if (menusound) {
					$('#menu')[0].play();
				}
				$(".tradeButtonContainer").hide();
				$(".rightMain").css("bottom", "0");
				if ($(".unboxing").css('display') == 'block') {
					$(".unboxing").hide();
					$(".jackpot").show();
				}
			}
		}
	});

	$("#coinTab").click(function () {
		if ($(".coinContainer").css('display') == 'none') {
			$(this).toggleClass("active");
			$("#jackpotTab").removeClass("active");
			$("#upgradeTab").removeClass("active");
			$("#inventoryTab").removeClass("active");
			$("#newsTab").removeClass("active");
			$("#caseTab").removeClass("active");
			$(".upgradeContainer").hide();
			$(".jackpotRightContainer").hide();
			$(".newsContainer").hide();
			$(".coinContainer").show();
			$(".caseContainer").hide();
			$(".inventoryContainer").hide();
			if (menusound) {
				$('#menu')[0].play();
			}
			$(".rightMain").css("bottom", "135px");
			$(".tradeButtonContainer").hide();
			if ($(".unboxing").css('display') !== 'block') {
				$(".unboxing").show();
				$(".jackpot").hide();
			}
		}
	});

	$("#newsTab").click(function () {
		if ($(".newsContainer").css('display') == 'none') {
			$(this).toggleClass("active");
			$("#jackpotTab").removeClass("active");
			$("#upgradeTab").removeClass("active");
			$("#inventoryTab").removeClass("active");
			$("#caseTab").removeClass("active");
			$("#coinTab").removeClass("active");
			$(".upgradeContainer").hide();
			$(".jackpotRightContainer").hide();
			$(".newsContainer").show();
			$(".coinContainer").hide();
			$(".caseContainer").hide();
			$(".inventoryContainer").hide();
			if (menusound) {
				$('#menu')[0].play();
			}
			$(".rightMain").css("bottom", "135px");
			$(".tradeButtonContainer").hide();
			if ($(".unboxing").css('display') !== 'block') {
				$(".unboxing").show();
				$(".jackpot").hide();
			}
		}
	});

	$('.settings').click(function () {
		$('.settingsList').toggleClass("hidden");
		if (menusound) {
			$('#menu')[0].play();
		}
	});

	$('#popupCheckbox').change(function () {
		if (this.checked) {
			popup = false;
		} else {
			popup = true;
		}
	});

	$('#unboxCheckbox').change(function () {
		if (this.checked) {
			unboxsound = false;
		} else {
			unboxsound = true;
		}
	});

	$('#menuCheckbox').change(function () {
		if (this.checked) {
			menusound = false;
		} else {
			menusound = true;
		}
	});

	$('#acceptedCheckbox').change(function () {
		if (this.checked) {
			acceptedsound = false;
		} else {
			acceptedsound = true;
		}
	});

	$('#wonCheckbox').change(function () {
		if (this.checked) {
			wonsound = false;
		} else {
			wonsound = true;
		}
	});

	$('#botCheckbox').change(function () {
		if (this.checked) {
			botsound = false;
		} else {
			botsound = true;
		}
	});

	$('#lostCheckbox').change(function () {
		if (this.checked) {
			lostsound = false;
		} else {
			lostsound = true;
		}
	});

	$(".clearGameState").click(function () {
		clearGameState();
	});

	/*===============DOM MANIP===============*/

	function caseInfo() {
		$('#caseDisplayImage').attr("src", operationCases[currentCase]["img"] + "/240fx182f");
		$('#caseName').html(operationCases[currentCase]["name"]);
		$('#casePrice').html("Case Price: $" + (operationCases[currentCase]["price"] - caseDiscount).toFixed(2) + "  |");
		$('#keyPrice').html("Key Price: $" + (keyPrice - keyDiscount).toFixed(2));
	}

	function update() {
		$('#money').html("$" + money.toFixed(2));
		$('#inventorySpace').html(inventoryCurrent + "/" + inventoryMax);
	}

	function caseModalDraw(name, img) {
		$(".modalMain").html("");
		if ($(".modalMain").hasClass("winner")) {
			$(".modalMain").removeClass("winner");
		}
		$(".modalMain").addClass("unbox");
		$(".modalMain").append('<img src="" id="modalImage"/> <div class="modalSkinName" id="modalSkinName"></div> <div class="modalClose unbox button" id="modalClose">Continue</div>');
		$("#modalImage").attr("src", img + "");
		$("#modalSkinName").html(name);
	}

	function inventoryValue() {
		var inventoryKeys = Object.keys(inventory);
		var totalValue = 0;
		for (var i = 0; i < inventoryKeys.length; i++) {
			totalValue += eval(atob(inventory[inventoryKeys[i]]))["price"];
		}
		$(".inventoryValue").html("Value: $" + totalValue.toFixed(2));
	}

	/*===============UPGRADES===============*/
	function upgradeMultiplier(basePrice, amount) {
		var newPrice = basePrice * Math.pow(2.00, amount + 1).toFixed(2);
		console.log(newPrice);
		return newPrice;
	}

	$(".stackingUpgradeContainer").on("click", ".upgrade", function () {
		var name = stackingUpgrades[this.id]["name"];
		var desc = stackingUpgrades[this.id]["desc"];
		if (menusound) {
			$('#menu')[0].play();
		}

		if (money >= stackingUpgrades[this.id]["price"]) {
			money -= stackingUpgrades[this.id]["price"];
			stackingUpgrades[this.id]["price"] = upgradeMultiplier(stackingUpgrades[this.id]["basePrice"], stackingUpgradesPurchased[this.id]);
			//console.log(upgradeMultiplier(stackingUpgrades[this.id]["basePrice"], stackingUpgradesPurchased[this.id]));
			keyDiscount += stackingUpgrades[this.id]["kp"];
			caseDiscount += stackingUpgrades[this.id]["cp"];
			inventoryMax += stackingUpgrades[this.id]["is"];
			acceptMoneyPerClick += stackingUpgrades[this.id]["mc"];
			stackingUpgradesPurchased[this.id] += 1;
		}
		caseInfo();
		$("#" + this.id).find(".upgradePrice").html("$" + stackingUpgrades[this.id]["price"].toFixed(2));
		$("#" + this.id).find(".upgradeAmount").html(stackingUpgradesPurchased[this.id]);
	});


	var stackingUpgrades = {
		upgrade1: {
			name: "Inventory Space",
			desc: "+1 to your max inventory space.",
			basePrice: 15,
			price: 15,
			cp: 0.00,
			kp: 0.00,
			is: 1,
			mc: 0.00,
			img: "https://steamcommunity-a.akamaihd.net/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAr7BMx-94b6MohOf-Xwsn7-USVDXgHhOG1zPDeLmsxwRtYpItIUb2wskZ6I0FWp9DdsKkOtQslw/100fx100f"
		},
		upgrade2: {
			name: "Key Discount",
			desc: "Discount Key Prices",
			basePrice: 150,
			price: 150,
			cp: 0.00,
			kp: 0.05,
			is: 0,
			mc: 0.00,
			img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNTPcUlrBpNQ0LvROW-0vDYVkRLNhRStbOkJzgxnaXLdDkTuNnmzYbak6byYb2ExGoHvJ1z2b7Fp9igjlflrUJoYmCiJ4KLMlhpukSlLYY/100fx100f"
		},
		upgrade3: {
			name: "More Money",
			desc: "More money per click +10",
			basePrice: 500,
			price: 500,
			cp: 0.00,
			kp: 0.00,
			is: 0,
			mc: 0.10,
			img: "https://steamcommunity-a.akamaihd.net/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAr7BMx-94b6MohOf-Xwsn7-USVDXgHhOG1zPDeLmsxwRtYpItIUb2wskZ6I0FWp9DdsKkOtQslw/100fx100f"
		}
		//upgrade4: {name: "Inventory Space II", desc: "Inventory Space: +5", price: 75, cp: 0.00, kp: 0.00, is: 5, img: "https://steamcommunity-a.akamaihd.net/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAr7BMx-94b6MohOf-Xwsn7-USVDXgHhOG1zPDeLmsxwRtYpItIUb2wskZ6I0FWp9DdsKkOtQslw/100fx100f"}
	};

	var stackingUpgradesPurchased = {
		upgrade1: 0,
		upgrade2: 0,
		upgrade3: 0
	};

	function drawPermUpgradeContainer() {

	}

	function drawStackingUpgrades() {
		for (var upgrade in stackingUpgrades) {
			if (stackingUpgrades.hasOwnProperty(upgrade)) {
				//console.log(upgrade);
				if (stackingUpgradesPurchased[upgrade] > 0) {
					var upgradeTicker = stackingUpgradesPurchased[upgrade];
					for (var i = 0; i < upgradeTicker; i++) {
						buyUpgrade(upgrade);
					}
					$(upgrade).find(".upgradePrice").html("$" + stackingUpgrades[upgrade]["price"].toFixed(2));
					$(upgrade).find(".upgradeAmount").html(stackingUpgrades[upgrade]);
				}
				$(".stackingUpgradeContainer").append('<div class="upgrade" id="' + upgrade + '"> <div class="upgradePicture"> <img src="' + stackingUpgrades[upgrade]["img"] + '" id="upgradePicture"></div> <div class="upgradeInfo"> <div class="upgradeName">' + stackingUpgrades[upgrade]["name"] + '</div> <div class="upgradeDesc">' + stackingUpgrades[upgrade]["desc"] + '</div> <div class="upgradePriceLabel">Price: <span class="upgradePrice">' + "$" + stackingUpgrades[upgrade]["price"].toFixed(2) + '</span> </div> <div class="upgradeAmountLabel">Amount: <span class="upgradeAmount">' + stackingUpgradesPurchased[upgrade] + '</span> </div> </div> </div>');
			}
		}
	}


	function buyUpgrade(id) {
		stackingUpgrades[id]["price"] = upgradeMultiplier(stackingUpgrades[id]["basePrice"], stackingUpgradesPurchased[id]);
		keyDiscount += stackingUpgrades[id]["kp"];
		caseDiscount += stackingUpgrades[id]["cp"];
		inventoryMax += stackingUpgrades[id]["is"];
		acceptMoneyPerClick += stackingUpgrades[id]["mc"];
		caseInfo();
	}



	/*===============CASES===============*/
	function drawCases() {
		for (var crate in operationCases) {
			if (operationCases.hasOwnProperty(crate)) {
				$(".caseContainer").append('<div class="case" id="' + crate + '"> <div class="casePicture"> <img src="' + operationCases[crate]["img"] + '" id="casePicture"></div> <div class="caseInfo"> <div class="caseTitle">' + operationCases[crate]["name"] + '</div> <div class="caseValue">Value: ' + "$" + operationCases[crate]["price"].toFixed(2) + '</div> </div> </div>');
			}
		}
	}

	$(".caseContainer").on('click', '.case', function () {
		currentCase = this.id;
		caseInfo();
	});

	/*===============JACKPOT===============*/
	var jackpotUnlocked = true;
	var jackpotInProgress = false;
	var swapSkins = 0;
	var maxSwapSkins = 15;
	var swapSkinsValue = 0;
	var jackpotSelectedInventory = {};
	var jackpotDifficulty = "low";

	$(".jackpotRightPlayer").on("click", ".inventorySwapItem", function () {
		if (inventoryCurrent <= inventoryMax) {
			if (Object.keys(jackpotInventory).length < maxSwapSkins && jackpotInProgress == false) {
				if (inventory[this.id]) {
					var item = eval(atob(inventory[this.id]));
					//console.log(item);
					jackpotInventory[this.id] = inventory[this.id];
					drawSwappedItem(item.name, item.price, item.img, this.id);
					swapSkins += 1;
					if (menusound) {
						$('#menu')[0].play();
					}
					swapSkinsValue += item.price;
					updateSwapInfo();
					//delete inventory[this.id];
					$(this).remove();
				}
			}
		}
	});

	$(".jackpotRightToBet").on("click", ".swappedItem", function () {
		if (inventoryCurrent <= inventoryMax) {
			if (jackpotInventory[this.id]) {
				var item = eval(atob(jackpotInventory[this.id]));
				//console.log(item);
				inventory[this.id] = jackpotInventory[this.id];
				drawJackpotSwapItem(item.name, item.price, item.img, this.id);
				swapSkins -= 1;
				swapSkinsValue -= item.price;
				updateSwapInfo();
				delete jackpotInventory[this.id];
				$(this).remove();
			}
		}
	});

	$(".jackpotRightStartButton").click(function () {
		if (Object.keys(jackpotInventory).length <= maxSwapSkins && swapSkins > 0 && jackpotInProgress == false) {
			$(".depositorContainer").html("");
			inventoryCurrent -= Object.keys(jackpotInventory).length;

			jackpotStart();
			inventoryReDraw();
		}
	});

	function drawJackpotSwapItem(name, price, img, id) {
		var keys = Object.keys(inventory);
		var rarity = atob(inventory[id]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
		if (rarity === "regular" || rarity === "falchionst" || rarity === "butterst" || rarity === "chromast" || rarity === "chroma" || rarity === "huntsman" || rarity === "gamma" || rarity === "huntst" || rarity === "butterfly" || rarity === "bowie" || rarity === "bowiest" || rarity === "shadow" || rarity === "shadowst" || rarity === "falchion") {
			rarity = "knife";
		}

		var name = name;
		var price = "$" + price.toFixed(2);
		var img = img + "/70fx70f";

		$(".jackpotRightPlayer").append('<div class="inventorySwapItem ' + rarity + '" id="' + id + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
	}

	function drawSwappedItem(name, price, img, id) {
		var keys = Object.keys(inventory);
		var rarity = atob(inventory[id]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
		if (rarity === "regular" || rarity === "falchionst" || rarity === "bowie" || rarity === "bowiest" || rarity === "butterst" || rarity === "chromast" || rarity === "gamma" || rarity === "chroma" || rarity === "huntsman" || rarity === "huntst" || rarity === "butterfly" || rarity === "shadow" || rarity === "shadowst" || rarity === "falchion") {
			rarity = "knife";
		}

		var name = name;
		var price = "$" + price.toFixed(2);
		var img = img + "/70fx70f";

		$(".jackpotRightToBet").append('<div class="swappedItem ' + rarity + '" id="' + id + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
	}

	function drawSwapInventory() {
		jackpotInventory = {};
		$(".jackpotRightToBet").html("");
		$(".jackpotRightPlayer").html("");
		swapSkinsValue = 0;
		swapSkins = 0;
		updateSwapInfo();
		// I know this is cancer dont hate please
		var keys = Object.keys(inventory);

		for (var i = 0; i < keys.length; i++) {
			var rarity = atob(inventory[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
			if (rarity === "regular" || rarity === "bowie" || rarity === "bowiest" || rarity === "falchionst" || rarity === "butterst" || rarity === "chromast" || rarity === "chroma" || rarity === "gamma" || rarity === "huntsman" || rarity === "huntst" || rarity === "butterfly" || rarity === "shadow" || rarity === "shadowst" || rarity === "falchion") {
				rarity = "knife";
			}
			var item = eval(atob(inventory[keys[i]]));
			var name = item["name"];
			var price = "$" + item["price"].toFixed(2);
			var img = item["img"] + "/70fx70f";

			$(".jackpotRightPlayer").append('<div class="inventorySwapItem ' + rarity + '" id="' + keys[i] + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
		}
	}

	function updateSwapInfo() {
		$(".jackpotRightValueTotal").html("$" + swapSkinsValue.toFixed(2))
		$(".jackpotRightSkinsTotal").html(swapSkins + "/" + maxSwapSkins);
	}



	//{name: "", difficulty: 1, profilePic: ""},
	var jackpotAI = {
		bot1: ["jGal | CSGOClicker.net", 1, "https://i.imgur.com/WTjn0MM.png"],
		bot2: ["exochase", 1, "https://i.imgur.com/za6Y17z.png"],
		bot3: ["S5E3", 1, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/62/62001ac6b067182b65f92fa07797c630af64bb4a_full.jpg"],
		bot4: ["MR.BEATS", 2, "https://i.imgur.com/dIs0yE8.png"],
		bot5: ["CockCrusher19", 2, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/03b0621515c85e256c20a8f169737430fa57281d_full.jpg"],
		bot6: ["Octane | n OU", 2, "https://i.imgur.com/P2hwwIE.png"],
		bot7: ["Moon Cricket Butler", 3, "https://i.imgur.com/qNsPKRH.png"],
		bot8: ["filsmick", 3, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c3/c31d18ad931fd685ca3af5700db6a461e10bcfe8_full.jpg"],
		bot9: ["Nino Triste", 3, "https://i.imgur.com/n1iHk8a.png"],
		bot10: ["Lucky", 4, "https://i.imgur.com/Dg7cI81.png"],
		bot11: ["seif.", 4, "https://i.imgur.com/gcieULF.png"],
		bot12: ["Plebeian", 4, "https://i.imgur.com/ZjMTocK.png"],
		bot13: ["buckETS | Trading", 5, "https://i.imgur.com/wSVK1bt.png"],
		bot14: ["banned", 5, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/57/575daf48a20828cb6470193b7067d2782aa5ff0f_full.jpg"],
		bot15: ["Roflzilla", 5, "https://i.imgur.com/prnsggZ.png"],
		bot16: ["Jainxu", 6, "https://i.imgur.com/nwEsAGH.png"],
		bot17: ["Platinum (diff7)", 6, "https://i.imgur.com/BzuCWzL.png"],
		bot18: ["sp00ky gh0stman", 6, "https://i.imgur.com/ISxQyow.png"],
		bot19: ["storM", 7, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e5/e51667b64e8591b8428b4fc268fc826f21a982cf_full.jpg"],
		bot20: ["Earth", 8, "https://i.imgur.com/uwIoGpM.jpg"],
		bot21: ["UnderWater", 8, "https://i.imgur.com/7BTk8ig.jpg"],
		bot22: ["Morty", 8, "https://i.imgur.com/Skzow5x.jpg"],
		bot23: ["Doge", 8, "https://i.gyazo.com/c69e8efdccc0c9a03f69df5206a57d21.png"],
		bot24: ["MyBack", 8, "https://i.imgur.com/sDpf0y3.jpg"],
		bot25: ["Skittle", 8, "https://i.imgur.com/Zi9J6CJ.jpg"],
		bot26: ["SirRazor", 8, "https://i.imgur.com/4WA3vTU.jpg"],
		bot27: ["DennyB", 8, "https://i.imgur.com/VNE57CT.jpg"],
		bot28: ["Bio", 8, "https://i.imgur.com/acTRiBk.jpg"],
		bot29: ["Tiny", 8, "https://i.imgur.com/2aOas2H.jpg"],
		bot30: ["Toshiyuki", 8, "https://i.imgur.com/rNszEvF.jpg"],
		bot31: ["King of KFC Jamal", 9, "https://i.imgur.com/XhFlH2S.jpg"]
	};

	var jackpotPots = {
		low: ["bot1", "bot2", "bot3", "bot4", "bot5", "bot6", "bot7", "bot8", "bot9"],
		medium: ["bot10", "bot11", "bot12", "bot13", "bot14", "bot15", "bot16", "bot17", "bot18", "bot19"],
		high: ["bot20", "bot21", "bot22", "bot23", "bot24", "bot25", "bot26", "bot27", "bot28", "bot29", "bot30", "bot31"]
	}


	//different version of difficulty
	var jackpotAiDifficulty1 = {
		1: {
			freq: 0.20,
			milspec: 0.950,
			restricted: 0.975,
			classified: 0.998,
			covert: 0.999
		},
		2: {
			freq: 0.30,
			milspec: 0.750,
			restricted: 0.900,
			classified: 0.998,
			covert: 0.999
		},
		3: {
			freq: 0.35,
			milspec: 0.500,
			restricted: 0.600,
			classified: 0.950,
			covert: 0.999
		},
		4: {
			freq: 0.40,
			milspec: 0.350,
			restricted: 0.500,
			classified: 0.950,
			covert: 0.999
		},
		5: {
			freq: 0.50,
			milspec: 0.200,
			restricted: 0.400,
			classified: 0.600,
			covert: 0.800
		},
		6: {
			freq: 0.05,
			milspec: 0.150,
			restricted: 0.200,
			classified: 0.950,
			covert: 0.400
		},
		7: {
			freq: 0.05,
			milspec: 0.050,
			restricted: 0.150,
			classified: 0.950,
			covert: 0.350
		},
		8: {
			freq: 0.05,
			milspec: 0.025,
			restricted: 0.090,
			classified: 0.350,
			covert: 0.250
		},
		9: {
			freq: 0.05,
			milspec: 0.005,
			restricted: 0.010,
			classified: 0.015,
			covert: 0.050
		}
	};


	var jackpotAiDifficulty2 = {
		1: ["milspec"],
		2: ["milspec", "restricted"],
		3: ["milspec", "restricted", "classified"],
		4: ["milspec", "restricted", "classified", "covert"],
		5: ["milspec", "restricted", "classified", "covert", "knife"],
		6: ["restricted", "classified", "covert", "knife"],
		7: ["classified", "stattrak", "covert", "knife"],
		8: ["stattrak", "covert", "knife"],
		9: ["stattrak", "knife"]
	};


	function inventoryReDraw() {
		$(".jackpotRightPlayer").html("");
		$(".inventoryItemContainer").html("");
		$(".jackpotRightToBet").html("");
		drawInventory();
		drawSwapInventory();
		inventoryValue();
	}

	function jackpotStart() {
		$(".jackpotRightToBet").html("");
		$(".winnerIs").html("");
		$(".winneravatar").html("");
		jackpotInProgress = true;
		var skins = 0;
		var maxSkins = 150;
		var pot = {};
		var players = [];
		var botTickets = {
			bot1: 0,
			bot2: 0,
			bot3: 0,
			bot4: 0,
			bot5: 0,
			bot6: 0,
			bot7: 0,
			bot8: 0,
			bot9: 0,
			bot10: 0,
			bot11: 0,
			bot12: 0,
			bot13: 0,
			bot14: 0,
			bot15: 0,
			bot16: 0,
			bot17: 0,
			bot18: 0,
			bot19: 0,
			bot20: 0,
			bot21: 0,
			bot22: 0,
			bot23: 0,
			bot24: 0,
			bot25: 0,
			bot26: 0,
			bot27: 0,
			bot28: 0,
			bot29: 0,
			bot30: 0,
			bot31: 0
		};
		var playerTickets = 0;
		var totalTickets = 0;
		var jackpotItemCounter = 0;
		var jackpotTimerCounter = 60;
		var depositTicker = 0;
		var AIKeys = JSON.parse(JSON.stringify(jackpotPots[jackpotDifficulty]));

		for (var skin in jackpotInventory) {
			if (jackpotInventory.hasOwnProperty(skin)) {
				if (inventory.hasOwnProperty(skin)) {
					var item = eval(atob(jackpotInventory[skin]));
					playerTickets += item.price * 100;
					//console.log(skin);
					pot[skin] = jackpotInventory[skin];
					skins += 1;
					//console.log(skins);
					delete inventory[skin];
				} else {
					//delete jackpotInventory[skin];
				}
			}
		}
		jackpotInventory = {};

		totalTickets += playerTickets;

		function drawPlayerDepositor(playerName, playerValue, playerImg) {
			$(".depositorContainer").append('<div class="jackpotDepositor" id="playerDepositor"> <div class="depositorInfo"><img src="' + playerImg + '" class="depositorProPic"> <div class="depositorName">' + playerName + '</div> <div class="depositorValue" id="depositValue">$' + playerValue + '</div> <div class="depositorSkinContainer" id="playerDeposit"> </div> </div> </div>');
			$("#playerDepositor").hide().fadeIn();
			var keys = Object.keys(pot);

			for (var i = 0; i < keys.length; i++) {
				var rarity = atob(pot[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
				if (rarity === "regular" || rarity === "bowie" || rarity === "bowiest" || rarity === "falchionst" || rarity === "butterst" || rarity === "chromast" || rarity === "chroma" || rarity === "gamma" || rarity === "huntsman" || rarity === "huntst" || rarity === "butterfly" || rarity === "shadow" || rarity === "shadowst" || rarity === "falchion") {
					rarity = "knife";
				}
				var item = eval(atob(pot[keys[i]]));
				var name = item["name"];
				var price = item["price"].toFixed(2);
				var img = item["img"] + "/70fx70f";

				$("#playerDeposit").append('<div class="depositorSkin ' + rarity + '" id="' + keys[i] + '" title="' + name + '"><div class="itemPrice">$' + price + '</div> <img src=' + img + '> </div>');
			}

		}
		$(".jackpotCountDown").html(jackpotTimerCounter);
		drawPlayerDepositor(username, (playerTickets / 100).toFixed(2), useravatar);
		$(".jackpotCurrentWorth").html("Pot: $" + (totalTickets / 100).toFixed(2));
		$(".jackpotPercentOfTickets").html("Your odds to win: " + (playerTickets / totalTickets * 100).toFixed(2) + "%");

		var jackpotTimer = setInterval(function () {
			if (jackpotTimerCounter > 0) {
				if (skins < maxSkins) {
					jackpotAISkinDraw();
				} else {
					jackpotPickWinner();
					clearInterval(jackpotTimer);
				}
				jackpotTimerCounter -= 1;
			} else {
				jackpotPickWinner();
				clearInterval(jackpotTimer);
			}
			//console.log(jackpotTimerCounter);
			//console.log("Skins:" + skins);
			$(".jackpotCurrentWorth").html("Pot: $" + (totalTickets / 100).toFixed(2));
			$(".jackpotPercentOfTickets").html("Your odds to win: " + (playerTickets / totalTickets * 100).toFixed(2) + "%");
			$(".jackpotCountDown").html(jackpotTimerCounter);
		}, 1000);

		function jackpotAISkinDraw() {
			if (Math.random() > 0.85) {
				if (AIKeys.length > 0) {
					if (maxSkins - skins <= maxSwapSkins) {
						jackpotRandSkin();
						//skins += Math.round(Math.random() * (maxSkins - skins));
					} else {
						jackpotRandSkin();
					}
				} else {
					console.log("empty!");
				}
			}

			function jackpotRandSkin() {
				var jackpotCase = "";
				var skinsArray = [];
				var randSkin = "";
				var randNum = Math.random().toFixed(3); //rounded to 3 places to make it slightly easier to get certain rarities
				var numSkins = Math.ceil(Math.random() * 6);
				var identifier;

				//console.log(AIKeys);

				var randomBot = AIKeys[Math.floor(AIKeys.length * Math.random())];

				//console.log(randomBot);

				var botName = jackpotAI[randomBot][0];
				var botDiff = jackpotAI[randomBot][1];
				var botImg = jackpotAI[randomBot][2];


				players.push(randomBot);
				//console.log(botName);
				//console.log(jackpotAiDifficulty2[botDiff]);

				//sticks with same bot for the duration of # of skins they have, new rarity for each skin


				function skinChoose() {
					jackpotCase = Object.keys(cases)[Math.floor(Object.keys(cases).length * Math.random())];

					var rarity = jackpotAiDifficulty2[botDiff][Math.floor(jackpotAiDifficulty2[botDiff].length * Math.random())];

					if (rarity === "knife") {
						//var knifeCase = Object.keys(knives)[Math.floor(Math.random() * Object.keys(knives).length)];
						var knifeCase = Object.keys(knives)[Math.floor(Object.keys(knives).length * Math.random())];

						skinsArray = Object.keys(knives[knifeCase]);
						randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];
						identifier = knives[knifeCase][randSkin];

						//console.log(identifier.name);
						//console.log(identifier.price * 100);
						botTickets[randomBot] += Math.round(identifier.price * 100);
						totalTickets += Math.round(identifier.price * 100);
						var toEncode = "knives['" + knifeCase + "']" + "['" + randSkin + "']";
						//console.log(toEncode);
						pot["item" + itemCounter] = window.btoa(toEncode);

						//drawItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);
						drawBotItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);
					} else {

						skinsArray = Object.keys(cases[jackpotCase][rarity]);
						randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];
						identifier = cases[jackpotCase][rarity][randSkin];

						botTickets[randomBot] += Math.round(identifier.price * 100);
						totalTickets += Math.round(identifier.price * 100);

						var toEncode = "cases['" + jackpotCase + "']" + "['" + rarity + "']" + "['" + randSkin + "']";
						//console.log(toEncode);
						pot["item" + itemCounter] = window.btoa(toEncode);
						//console.log(cases[currentCase][rarity][randSkin]);

						drawBotItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);

					}
					skins += 1;
					jackpotItemCounter += 1;
					itemCounter += 1;
				}

				function drawBotItem(array, rarity) {
					var name = array[0];
					var price = "$" + array[1].toFixed(2);
					var img = array[2] + "/70fx70f";
					var rarity = rarity;
					var botSelector = "deposit" + depositTicker;

					$('#' + botSelector).append('<div class="depositorSkin ' + rarity + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
					if (botsound) {
						$('#botentered')[0].play();
					}
					//console.log(randomBot);
				}

				var depositValueVar = "depositValue" + depositTicker;

				function drawDepositor(botName, botDrawPrice, botImg) {
					var depositorProPic = botImg;
					var depositorName = botName;

					$(".depositorContainer").append('<div class="jackpotDepositor" id="jackpotDepositor' + randomBot + '"> <div class="depositorInfo"><img src="' + depositorProPic + '" class="depositorProPic"> <div class="depositorName">' + depositorName + '</div> <div class="depositorValue" id="depositValue' + depositTicker + '"></div> <div class="depositorSkinContainer" id="deposit' + depositTicker + '"> </div> </div> </div>');
					$("#jackpotDepositor" + randomBot).hide().fadeIn();
				}
				drawDepositor(botName, botDrawPrice, botImg);

				for (var i = 0; i < numSkins; i++) {
					skinChoose();
				}


				var botDrawPrice = botTickets[randomBot] / 100;
				//console.log(depositValueVar);
				$("#" + depositValueVar).html("$" + botDrawPrice.toFixed(2));
				depositTicker += 1;

				AIKeys.splice(AIKeys.indexOf(randomBot), 1);
			}

		}

		function jackpotPickWinner() {
			var ticketAdder = 0;
			var randTicket = Math.round(Math.random() * totalTickets);
			console.log("Random Ticket: " + randTicket);
			console.log("Player Tickets: " + playerTickets);
			console.log("Total Tickets: " + totalTickets);

			if (randTicket <= playerTickets && randTicket > 0) {
				$(".winneravatar").html('<img src="' + useravatar + '" width="70" height="70">');
				$(".winnerIs").html(username + " has won $" + (totalTickets / 100).toFixed(2) + " with " + (playerTickets / totalTickets * 100).toFixed(2) + "%");
				$("#playerDepositor").addClass("winner");
				console.log("You Win!");
				if (wonsound) {
					$('#youwon')[0].play();
				}
				inventoryCurrent += Object.keys(pot).length;
				$.extend(inventory, pot);
				skinOverflow();
				if (winnerModal) {
					winnerModalDraw();
				}

			} else {
				ticketAdder += playerTickets;
				for (var i = 0; i < players.length; i++) {
					var botTicketsOwned = botTickets[players[i]];
					if (randTicket <= (botTicketsOwned + ticketAdder) && randTicket > ticketAdder) {
						$(".winneravatar").html('<img src="' + jackpotAI[players[i]][2] + '" width="70" height="70">');
						$(".winnerIs").html("Winner is: " + jackpotAI[players[i]][0] + " with " + (botTicketsOwned / totalTickets * 100).toFixed(2) + "%");
						$("#jackpotDepositor" + players[i]).addClass("winner");
						console.log(players[i]);
						if (lostsound) {
							$('#startgame')[0].play();
						}
						itemCounter -= jackpotItemCounter;
						break;
					} else {
						ticketAdder += botTicketsOwned;
					}
				}
			}
			swapSkinsValue = 0;
			swapSkins = 0;
			inventoryReDraw();
			updateSwapInfo();
			$(".jackpotCountDown").html("00");
			//console.log(botTickets);
			//console.log(pot);
			jackpotInProgress = false;
			saveGameState();
		}

		var winnerModal = true;

		function winnerModalDraw() {
			//<img src="" id="modalImage"/> <div class="modalSkinName" id="modalSkinName"></div> <div class="unboxButton button" id="unboxButton">Continue</div>
			//<div class="winnerModalHeader">Congratulations</div> <div class="winnerModalMessage">You won <span class="winnerAmount">$586.14</span> worth of skins.</div> <div class="winnerModalWarnMessage"><i class="fa fa-exclamation-triangle"></i> You are over your max inventory space. Upgrade inventory space or sell some items to bet and unbox again.</div> <div class="winnerModalSkinContainer"> </div>
			var winningSkinsValue = (totalTickets / 100).toFixed(2);
			console.log(totalTickets / 100);
			console.log((totalTickets / 100).toFixed(2));
			$(".modalMain").html("");
			if ($(".modalMain").hasClass("unbox")) {
				$(".modalMain").removeClass("unbox");
			}
			$(".modalMain").addClass("winner");
			$(".modalMain").append('<div class="modalClose">X</div><div class="winnerModalHeader">Congratulations!</div> <div class="winnerModalMessage">You won <span class="winnerAmount">$' + winningSkinsValue + '</span> worth of skins.</div><div class="winnerModalWarnMessage"><i class="fa fa-exclamation-triangle"></i> You are over your max inventory space. Upgrade inventory space or sell some items to bet and unbox again.</div><div class="winnerModalSkinContainer"> </div>');
			if (inventoryCurrent < inventoryMax) {
				$(".winnerModalWarnMessage").toggle();
			}

			var keys = Object.keys(pot);
			for (var i = 0; i < keys.length; i++) {
				var rarity = atob(pot[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
				if (rarity === "regular" || rarity === "bowie" || rarity === "bowiest" || rarity === "falchionst" || rarity === "butterst" || rarity === "chromast" || rarity === "chroma" || rarity === "gamma" || rarity === "huntsman" || rarity === "huntst" || rarity === "butterfly" || rarity === "shadow" || rarity === "shadowst" || rarity === "falchion") {
					rarity = "knife";
				}
				var item = eval(atob(pot[keys[i]]));
				var name = item["name"];
				var price = "$" + item["price"].toFixed(2);
				var img = item["img"] + "/70fx70f";

				$(".winnerModalSkinContainer").append('<div class="inventoryItem ' + rarity + '" id="' + keys[i] + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
			}
			$('.modalWindow').toggle();
		}
	}

	/*===============VISUAL===============*/

	function backgroundCheck() {
		$('.display').width($(window).width() - 575);
	}

	$(window).on('resize', function () {
		backgroundCheck();
	});

	function skinOverflow() {
		if (inventoryCurrent > inventoryMax) {
			$('.mainInfoLabelWarning').css('display', 'inline-block');
		} else if ($(".mainInfoLabelWarning:visible") && inventoryCurrent <= inventoryMax) {
			$('.mainInfoLabelWarning').css('display', 'none');
		}
	}
	/*
	$(".inventoryContainer").on({mouseenter: function() {
	  var item = eval(atob(inventory[this.id]));
	  var name = item["name"];
	  $(".tooltipAnchor").html(this.title);
	  $(".tooltipAnchor").show();
	  $(".tooltipAnchor").stop().animate({opacity:1}, 400);
	}, mouseleave: function() {
	  $(".tooltipAnchor").css("opacity", 0);
	  $(".tooltipAnchor").hide();
	}}, ".inventoryItem").mousemove(function() {
	    $(".tooltipAnchor").css({top: event.clientY - 125, left: event.clientX - 100});
	});
	*/

	$(".tt").on({
		mouseenter: function () {
			$(".tooltipAnchor").html($(this).attr("data-tt"));
			var ele = $(this).offset();
			$(".tooltipAnchor").css({
				top: ele.top - 28,
				left: ele.left - 100 + ($(this).width() / 2)
			});
			//console.log($(this).width() / 2);
			$(".tooltipAnchor").show();
		},
		mouseleave: function () {
			$(".tooltipAnchor").hide();
			$(".tooltipAnchor").html("");
		}
	});

	/*===============TICKERS===============*/

	setInterval(function () {
		update();
	}, 1000 / fps);

	setTimeout(function () {
		$("#notif").toggleClass("hidden");
		setTimeout(function () {
			$("#notif").toggleClass("hidden");
		}, 5000);
	}, 1500);

	setInterval(function () {
		saveGameState();
	}, 3000);

	/*===============SAVEGAME===============*/
	function saveGameState() {
		var string = {
			"money": money,
			"inventory": inventory,
			"itemCounter": itemCounter,
			"currentCase": currentCase,
			"stackingUpgradesPurchased": stackingUpgradesPurchased,
			"popup": popup,
			"unboxsound": unboxsound,
			"menusound": menusound,
			"acceptedsound": acceptedsound,
			"lostsound": lostsound,
			"wonsound": wonsound,
			"botsound": botsound,
		};

		localStorage.setItem("savegame", JSON.stringify(string));
		console.log("Game Saved.");
	}

	function loadGameState() {
		if (localStorage.getItem("savegame") !== null) {
			inventoryClear();
			var saveGame = JSON.parse(localStorage.getItem("savegame"));
			//console.log(saveGame);
			money = saveGame["money"];
			inventory = saveGame["inventory"];
			inventoryCurrent = Object.keys(inventory).length;
			itemCounter = saveGame["itemCounter"];
			currentCase = saveGame["currentCase"];
			stackingUpgradesPurchased = saveGame["stackingUpgradesPurchased"];
			popup = saveGame["popup"];
			unboxsound = saveGame["unboxsound"];
			menusound = saveGame["menusound"];
			acceptedsound = saveGame["acceptedsound"];
			lostsound = saveGame["lostsound"];
			wonsound = saveGame["wonsound"];
			botsound = saveGame["botsound"];
			drawInventory();
			inventoryValue();
			skinOverflow();
			console.log("Game Save found. Successfully loaded.");
		} else {
			console.log("No save game detected.")
		}

	}

	function clearGameState() {
		var clearsave = prompt("Are you sure you want to clear current save? (y/n)")
		if (clearsave === "n") {
			var notclear = alert("Your save was not cleared.");
		} else if (clearsave === "y") {
			var cleared = alert("Your save was cleared.");
			localStorage.removeItem("savegame");
			localStorage.removeItem("imgData");
			localStorage.removeItem("username");
			console.log("Game save deleted!");
			location.reload();
		} else {
			var wronginput = alert("Please put in the correct input.");
		}
	}

	/*===============CANVAS===============*/

	var audio = document.getElementById('startgame');
	var audio = document.getElementById('botentered');
	var audio = document.getElementById('youwon');
	var audio = document.getElementById('accepted');
	var audio = document.getElementById('menu');
	var audio = document.getElementById('unbox');

	audio.addEventListener('volume', function () {
		console.log('changed.', arguments);
	}, true);

	$(document).on('click', '#btnFlip', function () {
		var gameWelcome = alert("Welcome to the coin toss game!");
		var x = prompt("Enter a Value", "0")
		if (isNaN(x)) {
			var no = alert("Please enter a number, not a letter!");
		} else {
			if (+x > +money) {
				window.alert = function () {};
			} else if (+x < +0) {
				window.alert = function () {};
			} else {
				var y = 2;
				var z = x * y;
				var userChoice = prompt("Do you choose T or CT?").toUpperCase();
				var coinToss = Math.random();
				if (userChoice === "T") {
					if (coinToss < 0.5) {
						money += z;
					} else {
						money -= x;
					}
				} else {
					if (coinToss < 0.5) {
						money -= x;
					} else {
						money += z;
					}
				}
			}
		}
	});

	// Get all variables
	var bannerImage = document.getElementById('bannerImg');
	var result = document.getElementById('res');
	var img = document.getElementById('tableBanner');

	// 
	bannerImage.addEventListener('change', function () {
		var file = this.files[0];
		// declare a maxSize (3Mb)
		var maxSize = 3000000;

		if (file.type.indexOf('image') < 0) {
			res.innerHTML = 'invalid type';
			return;
		}
		var fReader = new FileReader();
		fReader.onload = function () {
			img.onload = function () {
				// if localStorage fails, it should throw an exception
				try {
					// pass the ratio of the file size/maxSize to your toB64 func in case we're already out of scope
					localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type));
				} catch (e) {
					var msg = e.message.toLowerCase();
					// We exceeded the localStorage quota
					if (msg.indexOf('storage') > -1 || msg.indexOf('quota') > -1) {
						// we're dealing with a jpeg image :  try to reduce the quality
						if (file.type.match(/jpe?g/)) {
							console.log('reducing jpeg quality');
							localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type, 0.7));
						}
						// we're dealing with a png image :  try to reduce the size
						else {
							console.log('reducing png size');
							// maxSize is a total approximation I got from some tests with a random pixel generated img
							var maxPxSize = 750000,
								imgSize = (img.width * img.height);
							localStorage.setItem("imgData", getBase64Image(img, (imgSize / maxPxSize), file.type));
						}
					}
				}
			}
			img.src = fReader.result;
		};

		fReader.readAsDataURL(file);
	});

	function getBase64Image(img, sizeRatio, type, quality) {
		// if we've got an svg, don't convert it, svg will certainly be less big than any pixel image
		if (type.indexOf('svg+xml') > 0) return img.src;

		// if we've got a jpeg
		if (type.match(/jpe?g/)) {
			var maxheight = 70;
			var maxwidth = 70;

			if (img.width > maxwidth && img.height > maxheight) {
				var canvas = document.createElement("canvas");
				// if our image file is too large, then reduce its size
				canvas.width = maxwidth;
				canvas.height = maxheight;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
				var dataURL = canvas.toDataURL(type, quality);

				return dataURL;
			} else if (img.width > maxwidth && img.height == maxheight) {
				var canvas = document.createElement("canvas");
				// if our image file is too large, then reduce its size
				canvas.width = maxwidth;
				canvas.height = img.height;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
				var dataURL = canvas.toDataURL(type, quality);

				return dataURL;
			} else if (img.width == maxwidth && img.height > maxheight) {
				var canvas = document.createElement("canvas");
				// if our image file is too large, then reduce its size
				canvas.width = img.width;
				canvas.height = maxheight;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
				var dataURL = canvas.toDataURL(type, quality);

				return dataURL;
			} else if (img.width < maxwidth && img.height < maxheight) {
				var canvas = document.createElement("canvas");
				// if our image file is too large, then reduce its size
				canvas.width = maxwidth;
				canvas.height = maxheight;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
				var dataURL = canvas.toDataURL(type, quality);

				return dataURL;
			} else if (img.width < maxwidth && img.height == maxheight) {
				var canvas = document.createElement("canvas");
				// if our image file is too large, then reduce its size
				canvas.width = maxwidth;
				canvas.height = img.height;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
				var dataURL = canvas.toDataURL(type, quality);

				return dataURL;
			} else if (img.width == maxwidth && img.height < maxheight) {
				var canvas = document.createElement("canvas");
				// if our image file is too large, then reduce its size
				canvas.width = img.width;
				canvas.height = maxheight;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
				var dataURL = canvas.toDataURL(type, quality);

				return dataURL;
			} else {
				var canvas = document.createElement("canvas");
				// if our image file is too large, then reduce its size
				canvas.width = img.width;
				canvas.height = img.height;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
				var dataURL = canvas.toDataURL(type, quality);

				return dataURL;
			}
		}
		// if we've got some other image type
		else type = 'image/png';

		var maxheight = 70;
		var maxwidth = 70;

		if (img.width > maxwidth && img.height > maxheight) {
			var canvas = document.createElement("canvas");
			// if our image file is too large, then reduce its size
			canvas.width = maxwidth;
			canvas.height = maxheight;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
			var dataURL = canvas.toDataURL(type, quality);

			return dataURL;
		} else if (img.width > maxwidth && img.height == maxheight) {
			var canvas = document.createElement("canvas");
			// if our image file is too large, then reduce its size
			canvas.width = maxwidth;
			canvas.height = img.height;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
			var dataURL = canvas.toDataURL(type, quality);

			return dataURL;
		} else if (img.width == maxwidth && img.height > maxheight) {
			var canvas = document.createElement("canvas");
			// if our image file is too large, then reduce its size
			canvas.width = img.width;
			canvas.height = maxheight;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
			var dataURL = canvas.toDataURL(type, quality);

			return dataURL;
		} else if (img.width < maxwidth && img.height < maxheight) {
			var canvas = document.createElement("canvas");
			// if our image file is too large, then reduce its size
			canvas.width = maxwidth;
			canvas.height = maxheight;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
			var dataURL = canvas.toDataURL(type, quality);

			return dataURL;
		} else if (img.width < maxwidth && img.height == maxheight) {
			var canvas = document.createElement("canvas");
			// if our image file is too large, then reduce its size
			canvas.width = maxwidth;
			canvas.height = img.height;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
			var dataURL = canvas.toDataURL(type, quality);

			return dataURL;
		} else if (img.width == maxwidth && img.height < maxheight) {
			var canvas = document.createElement("canvas");
			// if our image file is too large, then reduce its size
			canvas.width = img.width;
			canvas.height = maxheight;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
			var dataURL = canvas.toDataURL(type, quality);

			return dataURL;
		} else {
			var canvas = document.createElement("canvas");
			// if our image file is too large, then reduce its size
			canvas.width = img.width;
			canvas.height = img.height;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
			var dataURL = canvas.toDataURL(type, quality);

			return dataURL;
		}
	}

	function fetchimage() {
		var dataImage = localStorage.getItem('imgData');
		img.src = dataImage;
	}

	// Call fetch to get image from localStorage.
	fetchimage();

	$('#save').on('click', function () {

		$('input[type="text"]').each(function () {
			var id = $(this).attr('id');
			var value = $(this).val();
			localStorage.setItem(id, value);

		});
	});

	/*==============================================================================
	Canvas

	==============================================================================*/
	/*
	// "+1" popups
	var canvas = document.getElementById("drawing");
	var ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth - $('.right').width();
	canvas.height = window.innerHeight;
	var tt = [];
	function makeToolTip(element, ) {
	}
	*/


	/*
	$("#case").click(function() {
	  var randX = Math.floor(Math.random() * 240);
	  var randY = Math.floor(Math.random() * 180);
	  var text = "+ $" + moneyPC;
	  var alpha = 1.0;
	  var interval = setInterval(function () {
	    ctx.save();
	    canvas.width = canvas.width;
	    ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
	    ctx.font = "20px Georgia";
	    ctx.fillText(text, randX, randY);
	    alpha -= 0.05;
	    if (alpha < 0) {
	      canvas.width = canvas.width;
	      clear(interval);
	    }
	    ctx.restore();
	  }, 50);
	});
	*/


	/*
	var fps = 1000 / 60;
	var degrees = 0;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth - $('.right').width();
	canvas.height = window.innerHeight;
	function drawBackground() {
	  var image = new Image();
	  image.onload = function() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.save();
	    ctx.translate(canvas.width / 2, canvas.height / 2);
	    ctx.rotate(degrees * Math.PI / 180);
	    ctx.drawImage(image, -image.width / 2, -image.height / 2);
	    ctx.restore();
	    degrees += 0.1;
	    setTimeout(drawBackground, fps);
	    //requestFrameAnimation(drawBackground);
	  }
	   image.src = "images/sunburst.png";
	}
	function drawCase() {
	  var image = new Image();
	  image.onload = function() {
	    ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
	  }
	  image.src = "images/case.png";
	}
	function drawOrder() {
	  drawBackground();
	}
	drawOrder();
	*/
	/*function openCity(evt, cityName) {
	    // Declare all variables
	    var i, tabcontent, tablinks;

	    // Get all elements with class="tabcontent" and hide them
	    tabcontent = document.getElementsByClassName("tabcontent");
	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display = "none";
	    }

	    // Get all elements with class="tablinks" and remove the class "active"
	    tablinks = document.getElementsByClassName("tablinks");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }

	    // Show the current tab, and add an "active" class to the link that opened the tab
	    document.getElementById(cityName).style.display = "block";
	    evt.currentTarget.className += " active";
	}
	*/
	function init() {
		loadGameState();
		caseInfo();
		backgroundCheck();
		drawCases();
		drawStackingUpgrades();
	}
	init();
})();