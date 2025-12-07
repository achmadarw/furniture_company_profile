import ProductCustomizer from '@/components/ProductCustomizer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kitchen Set Customizer | Premium Kitchen Set',
    description:
        'Design your perfect kitchen set and get instant pricing. Choose materials, finishes, and hardware to create your dream kitchen.',
};

export default function CustomizerPage() {
    return <ProductCustomizer />;
}
