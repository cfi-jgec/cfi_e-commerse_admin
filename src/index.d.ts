declare interface CroppedArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare interface loginUserType {
    email: string;
    password: string;
}

declare interface IProducts {
    id: string;
    productId: string;
    name: string;
    category:  string;
    subtitle:  string;
    description: string;
    price: number;
    stock: number;
    image: string[];
    discount: number;
    createdAt: string;
    updatedAt: string;
}