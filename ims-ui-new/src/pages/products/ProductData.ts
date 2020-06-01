export interface BasicInfo {
    barcode: string;
    sku: string;
    productName: string;
    description: string;
    uom: string;
    category: string;
    department: string;

    retailPrice: string;
    salePrice: string;
    tax: string;

    reOrderThreshold: string;
    stock: number;
    bin: string;

    expiryDate: string;
    imageUrls: string;
}

export interface Dimension {
    weight: string;
    height: string;
    width: string;
    depth: string;
}