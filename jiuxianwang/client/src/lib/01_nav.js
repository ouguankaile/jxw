class Nav {
    constructor(data) {
        this.root = null;
        this.data = data;
        // console.log(this.data[0]);

    }
    init() {
        this.renderUI();
    }
    renderUI() {
        let navWrap = document.querySelector(".navWrap")
        this.root = document.createElement("div");
        this.root.classList.add(".nav");
        // console.log(this.data[0]);
        
        let tpl = this.data[0].map((ele, index) => {
            // console.log(ele);
            
            let textl = ele.text.map((item, i) => {
                let textll = item.map(el=>{
                    // console.log(el);
                return `<a href=${el.src}">${el.text}</a>`
                }).join("");
                
                
                return `<p>${textll}</p>`;
            }).join("")

            return `<li class="catItem" id="_nowactstr1" >
                <div class="catItemCon" name="__home_fenleiyijian" >
                <h3 name="tagH">
                <a target="_blank" href=${ele.href} >${ele.title}</a></h3>
               <div class="categoryCon" >${textl}</div> 
                </div>
            </li>`
        }).join("")
        let thl = this.data[1].map((ele,index)=>{
            return ` <li class="home on"><a name=${ele.name} class="channel" id=${ele.id} href=${ele.href}>${ele.text}</a></li>`
        }).join("");
        let htmlA = `
                <div class="navCategoryMenu">
                    <h2>全部商品列表</h2>
                    <ul class="categoryBox clearfix">${tpl} </ul>
                </div>
                <ul class="navList">${thl}</ul>
            </div>`;
        this.root.innerHTML = htmlA;
        navWrap.appendChild(this.root);
    }
}