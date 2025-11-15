interface Data {
    status: number;
  data: Structure[];
}

interface Structure {
    id: string;
    name: string;
    type: Type;
    rarity: Rarity;
    images: Images;
}

interface Type {
    value: string;
    displayValue: string;
}

interface Rarity {
    value: string;
    displayValue: string;
}

interface Images {
    smallIcon?: string;
    icon?: string;
    featured?: string;

}