const CategoryStorage = class {
    constructor() {
        this.categories = []
        this.id = 0;
    }

    async get_all_categories() {
        return await this.categories;
    }
    
    async get_category({id}) {
        return await this.categories.find(category => category.id === id);
    }
    async add_category({name}) {
        await this.categories.push({id: this.id++, name});
        return true;
    }
    async update_category({id, text}) {
        const category = await this.categories.find(category => category.id === id);
        if(!category) {
            return;
        }
        category.text = text;
    }
    async del_category(id) {
        this.categories.slice(this.categories.findIndex(category => category.id === id), 1)
    }
}

const categoryStorage = new CategoryStorage();
categoryStorage.add_category({name: "electronics"});
categoryStorage.add_category({name: "fruits"})
export default categoryStorage;

