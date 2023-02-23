import ListItem from "./ListItem"

interface List {
    list: ListItem[], //array med listitems
    load(): void,     // returnera void = ingenting, vi vill bara ladda listan
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void, 
}

export default class FullList implements List {
    static instance: FullList = new FullList()  
    private constructor(private _list: ListItem[] = []){}  //privat före konstruktorn eftersom det bara komma att vara en instans av klassen

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = [] //tömmer listan
        this.save() // skriver över det befilntliga i localstorage
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj) //puschar 'itemObj' som vi får
        this.save() //sparar listan med det nya objektet
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !==id) //filterar ut items med rätt id och sparar allt som inte är == rätt id.
        this.save() //sparar uppdaterad lista
    }

    
}