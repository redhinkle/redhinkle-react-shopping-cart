const productsArray = [
    {
        id: '1',
        name: 'coffee',
        price: '4.99'
    },
    {
        id: '2',
        name: 'camera',
        price: '40.99'
    },
    {
        id: '3',
        name: 'glasses',
        price: '9.99'
    },
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id)

    if (productData === undefined) {
        console.log('Product data does not exists for product id: ' + id)
        return undefined
    }

    return productData;
}

export{productsArray, getProductData}