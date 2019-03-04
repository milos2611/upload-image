export class CategoryModel {

    public id: number;
    public category_name: string;
    public category_description: string;
    public image_path:String;

    constructor(id: number, category_name: string, category_description: string,image_path:string) {
        this.id = id;
        this.category_name = category_name;
        this.category_description = category_description;
        this.image_path= image_path;
    }
}