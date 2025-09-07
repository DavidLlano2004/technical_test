// CardProduct.tsx
import { Icons } from "../../assets/icons/IconProvider";
import { formatPrice } from "../../helpers/truncatePrice";
import { Check } from "../../shared/components/check/Check";
import type { Product } from "../interfaces/product";

interface Props {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}

const productIconMap: Record<string, keyof typeof Icons> = {
  MFUND: "IconMFUND",
  CREA: "IconCREA",
  FICS: "IconFICS",
  BOLT: "IconBOLT",
};

const getProductColor = (productName: string): string => {
  const colorMap: Record<string, string> = {
    MFUND: "bg-green-dark-custom",
    CREA: "bg-blue-light-custom",
    FICS: "bg-blue-dark-custom",
    BOLT: "bg-orange-light-custom",
  };

  return colorMap[productName] || "bg-gray-500";
};

export const CardProduct = ({ product, isSelected, onSelect }: Props) => {
  const iconKey =
    product.iconProduct || productIconMap[product.nameProduct] || "IconDefault";
  const colorClass = getProductColor(product.nameProduct);

  const handleCardClick = () => {
    onSelect(product.numberProduct);
  };

  const handleCheckChange = (checked: boolean) => {
    if (checked) {
      onSelect(product.numberProduct);
    } else {
      onSelect(""); // Deseleccionar
    }
  };

  return (
    <div
      className={`w-full bg-white h-[400px] rounded-lg flex-col flex justify-between overflow-hidden transition ease-in duration-150 shadow cursor-pointer ${
        isSelected
          ? "border-[0.5px] border-primary-custom shadow-lg shadow-primary-custom/30"
          : "border-[0.5px] border-[#d8d8d8] hover:border-primary-custom/50 hover:shadow-primary-custom"
      }`}
      onClick={handleCardClick}
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-end items-center">
            <div onClick={(e) => e.stopPropagation()}>
              <Check isChecked={isSelected} onChange={handleCheckChange} />
            </div>
          </div>
          <div className="px-12">
            <p className="text-gray-custom-text font-bold text-lg">
              {product?.nameProduct}
            </p>
            <p className="text-gray-custom-text text-lg">
              #{product?.numberProduct}
            </p>
            <div className="h-[0.5px] bg-gray1-custom my-5"></div>
            <p className="text-gray-custom-text font-bold text-lg">
              Ya cuentas con:
            </p>
            <p className="text-lg text-primary-custom font-semibold">
              ${formatPrice(Number(product?.balanceProduct))}
            </p>
          </div>
        </div>
        <div>
          <img
            className="mx-auto w-10 translate-y-3"
            src={Icons[iconKey as keyof typeof Icons]}
            alt={product.nameProduct}
          />
          <div className="bg-gray2-custom p-8 rounded-md">
            <p className="text-center text-gray-custom-text font-semibold">
              {product.detaildProduct}
            </p>
          </div>
        </div>
      </div>
      <div className={`h-1.5 ${colorClass}`}></div>
    </div>
  );
};
