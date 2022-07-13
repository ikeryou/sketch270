
import { MyDisplay } from "../core/myDisplay";
import { Param } from "../core/param";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item:Array<{el:HTMLElement, list:Array<string>, fix:string}> = [];
  private _fixText:string = 'スマホを特定の位置までズームした人だけが読むことのできる秘密のメッセージ。';

  constructor(opt:any) {
    super(opt)

    let innerTxt = '';
    let arr = Array.from(this._fixText);
    for(let i = 0; i < arr.length; i++) {
      innerTxt += '<span>' + arr[i] + '</span>';
    }
    (document.querySelector('.l-text > .inner') as HTMLElement).innerHTML = innerTxt;

    document.querySelectorAll('.l-text span').forEach((val) => {
      this._item.push({
        el:val as HTMLElement,
        fix:val.innerHTML,
        list:this._getList()
      });
    })
  }


  private _getList(): Array<string> {
    const arr:Array<string> = [];
    // let fixArr = Array.from(this._fixText);
    for(let i = 0; i < 20; i++) {
      // if(Util.instance.hit(3)) {
      //   arr.push(Util.instance.randomArr(['■', '□']))
      // } else {
      //   arr.push(Util.instance.randomArr(fixArr))
      // }
      arr.push(Util.instance.randomArr(['■', '□', '◯', '●']))
    }
    return arr;
  }


  protected _update(): void {
    super._update();

    const zoomer = document.body.clientWidth / window.innerWidth;
    Param.instance.zoom = zoomer;

    const rate = Util.instance.map(zoomer, 0, 1, 1, 5);

    const isFix = (rate > 0.25 && rate < 0.4);
    // if(isFix) {
    //   document.body.classList.add('-fix')
    // } else {
    //   document.body.classList.remove('-fix')
    // }

    this._item.forEach((val) => {
      const key = ~~(Util.instance.map(rate, 0, val.list.length - 1, 0, 1));
      const t = val.list[key];

      if(isFix) {
        val.el.innerHTML = val.fix;
      } else {
        val.el.innerHTML = t;
      }
    })
  }
}