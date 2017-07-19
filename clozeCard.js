module.exports = ClozeCard;

function ClozeCard(text, cloze){
	this.fullText = text;
	this.cloze = cloze;
	this.partial = "";
	this.clozeCheck = false;
	this.front = "";
	this.clozeDeletion = function(){	
		var textArr = this.fullText.split(" ");
		for(var i = 0; i < textArr.length; i++){
			if(this.cloze === textArr[i].toLowerCase()){
				textArr[i] = "____";
				this.clozeCheck = true;
			}
			this.partial = this.partial + " " + textArr[i];
		}
		if (!this.clozeCheck) console.log("the cloze was not in the text!");
	};
}
