var $cards = $('.cards');
var cardsLength = 13;
var marks = {
  spade: '♠',
  heart: '♥',
  clover: '♣',
  dia: '♦'
};
for(var mark in marks) {
  console.log(marks[mark]
  )
	for(var i = 1;i <= cardsLength;i++) {
		$cards.append('<div class="card ' +  marks[mark] + ' ' + marks[mark] + '_' + i + ' num' + i + '"><div class="inner"><p class="back"></p><p class="front"><i class="mark">' + marks[mark] + '</i></p></div></div>');
	}
}