const _0x3612=['Users','doc','Data','then','exists','data','setAttribute','href','target','_blank','log','firestore','getElementById','container','lnk','header','upload-modal','modal','hide','ready','collection'];(function(_0x411afc,_0x1e0944){const _0x4a551f=function(_0x637d87){while(--_0x637d87){_0x411afc['push'](_0x411afc['shift']());}};_0x4a551f(++_0x1e0944);}(_0x3612,0x89));const _0xe229=function(_0x411afc,_0x1e0944){_0x411afc=_0x411afc-0x0;let _0x4a551f=_0x3612[_0x411afc];return _0x4a551f;};const storage=firebase['storage']();const firestore=firebase[_0xe229('0x0')]();var cont=document[_0xe229('0x1')](_0xe229('0x2'));var link=document['getElementById'](_0xe229('0x3'));var header=document[_0xe229('0x1')](_0xe229('0x4'));showModal(_0xe229('0x5'));function showModal(_0x499f56){$('#'+_0x499f56)['modal']('show');}function hideModal(_0x338f2f){$('#'+_0x338f2f)[_0xe229('0x6')](_0xe229('0x7'));}$(document)[_0xe229('0x8')](()=>{firestore[_0xe229('0x9')](_0xe229('0xa'))[_0xe229('0xb')](_0xe229('0xc'))['get']()[_0xe229('0xd')](_0x39cd52=>{if(_0x39cd52[_0xe229('0xe')]){const _0x2eaf92=_0x39cd52[_0xe229('0xf')]();const _0x462f93=_0x2eaf92['CV'];cont['setAttribute'](_0xe229('0xf'),_0x462f93);link[_0xe229('0x10')](_0xe229('0x11'),_0x462f93);link[_0xe229('0x10')](_0xe229('0x12'),_0xe229('0x13'));header[_0xe229('0x10')](_0xe229('0x11'),_0x462f93);header['setAttribute'](_0xe229('0x12'),'_blank');hideModal(_0xe229('0x5'));}})['catch'](function(_0x13f7ad){hideModal(_0xe229('0x5'));console[_0xe229('0x14')](_0x13f7ad);});});