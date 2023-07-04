import { defaultProducts } from "./Products";

export const Company = [
    {
        id:"24",
        company: "Major",
        products: [...defaultProducts("Major", 24)]
    },
    {
        id:"98",
        company: "Case",
        products: [...defaultProducts("Case", 98)]
    },
    {
        id:"83",
        company: "Improve",
        products: [...defaultProducts("Improve", 83)]
    },
    {
        id:"77",
        company: "Lying",
        products: [...defaultProducts("Lying", 77)]
    },
    {
        id:"49",
        company: "Type",
        products: [...defaultProducts("Type", 49)]
    },
    {
        id:"81",
        company: "Darkness",
        products: [...defaultProducts("Darkness", 81)]
    }
]


export const getAllProducts = () =>{
    let products = [];
    Company.map(val=>{
        products = [...products, ...val.products]
    });
    return products;
}