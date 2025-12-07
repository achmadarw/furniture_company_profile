'use client';

import { useState, useMemo } from 'react';
import {
    Ruler,
    Package,
    Palette,
    DollarSign,
    Calculator,
    Check,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface Material {
    id: string;
    name: string;
    pricePerSqm: number;
    image: string;
}

interface Finish {
    id: string;
    name: string;
    priceModifier: number; // Multiplier: 1.0 = no change, 1.2 = +20%
}

interface Hardware {
    id: string;
    name: string;
    price: number;
}

const materials: Material[] = [
    {
        id: 'plywood',
        name: 'Plywood Standard',
        pricePerSqm: 250000,
        image: '🪵',
    },
    { id: 'mdf', name: 'MDF Premium', pricePerSqm: 350000, image: '📦' },
    { id: 'solid', name: 'Solid Wood', pricePerSqm: 650000, image: '🌳' },
    { id: 'hpl', name: 'HPL Coating', pricePerSqm: 450000, image: '✨' },
];

const finishes: Finish[] = [
    { id: 'matte', name: 'Matte Finish', priceModifier: 1.0 },
    { id: 'glossy', name: 'Glossy Finish', priceModifier: 1.15 },
    { id: 'textured', name: 'Textured Finish', priceModifier: 1.25 },
    { id: 'lacquer', name: 'Lacquer Finish', priceModifier: 1.35 },
];

const hardwareOptions: Hardware[] = [
    { id: 'basic', name: 'Basic Hardware', price: 500000 },
    { id: 'standard', name: 'Standard Hardware', price: 1000000 },
    { id: 'premium', name: 'Premium Hardware', price: 2000000 },
    { id: 'luxury', name: 'Luxury Hardware', price: 3500000 },
];

export default function ProductCustomizer() {
    const [dimensions, setDimensions] = useState({
        width: 300,
        height: 220,
        depth: 60,
    });
    const [selectedMaterial, setSelectedMaterial] = useState<string>('plywood');
    const [selectedFinish, setSelectedFinish] = useState<string>('matte');
    const [selectedHardware, setSelectedHardware] =
        useState<string>('standard');
    const [includeInstallation, setIncludeInstallation] = useState(true);
    const [includeDelivery, setIncludeDelivery] = useState(true);

    // Calculate total area in square meters
    const totalArea = useMemo(() => {
        const { width, height, depth } = dimensions;
        // Calculate surface area (all 6 faces)
        const front = (width * height) / 10000; // cm² to m²
        const side = (depth * height) / 10000;
        const top = (width * depth) / 10000;
        return front * 2 + side * 2 + top * 2;
    }, [dimensions]);

    // Calculate base price
    const basePrice = useMemo(() => {
        const material = materials.find((m) => m.id === selectedMaterial);
        if (!material) return 0;
        return totalArea * material.pricePerSqm;
    }, [totalArea, selectedMaterial]);

    // Calculate finish cost
    const finishCost = useMemo(() => {
        const finish = finishes.find((f) => f.id === selectedFinish);
        if (!finish) return basePrice;
        return basePrice * finish.priceModifier;
    }, [basePrice, selectedFinish]);

    // Calculate hardware cost
    const hardwareCost = useMemo(() => {
        const hardware = hardwareOptions.find((h) => h.id === selectedHardware);
        return hardware?.price || 0;
    }, [selectedHardware]);

    // Calculate installation cost (15% of total)
    const installationCost = useMemo(() => {
        return includeInstallation ? (finishCost + hardwareCost) * 0.15 : 0;
    }, [finishCost, hardwareCost, includeInstallation]);

    // Calculate delivery cost (flat rate based on size)
    const deliveryCost = useMemo(() => {
        if (!includeDelivery) return 0;
        const volume =
            (dimensions.width * dimensions.height * dimensions.depth) / 1000000; // cm³ to m³
        if (volume < 1) return 200000;
        if (volume < 3) return 400000;
        return 600000;
    }, [dimensions, includeDelivery]);

    // Total price
    const totalPrice = useMemo(() => {
        return finishCost + hardwareCost + installationCost + deliveryCost;
    }, [finishCost, hardwareCost, installationCost, deliveryCost]);

    const handleRequestQuote = () => {
        const selectedMaterialData = materials.find(
            (m) => m.id === selectedMaterial
        );
        const selectedFinishData = finishes.find(
            (f) => f.id === selectedFinish
        );
        const selectedHardwareData = hardwareOptions.find(
            (h) => h.id === selectedHardware
        );

        const quoteDetails = `
Kitchen Set Customization Quote:

Dimensions: ${dimensions.width}cm × ${dimensions.height}cm × ${
            dimensions.depth
        }cm
Area: ${totalArea.toFixed(2)} m²

Material: ${selectedMaterialData?.name}
Finish: ${selectedFinishData?.name}
Hardware: ${selectedHardwareData?.name}

Base Material Cost: Rp ${basePrice.toLocaleString('id-ID')}
Finish Cost: Rp ${finishCost.toLocaleString('id-ID')}
Hardware: Rp ${hardwareCost.toLocaleString('id-ID')}
${
    includeInstallation
        ? `Installation: Rp ${installationCost.toLocaleString('id-ID')}`
        : ''
}
${includeDelivery ? `Delivery: Rp ${deliveryCost.toLocaleString('id-ID')}` : ''}

TOTAL: Rp ${totalPrice.toLocaleString('id-ID')}
        `;

        navigator.clipboard.writeText(quoteDetails);
        toast.success('Quote copied to clipboard! Contact us to proceed.');
    };

    return (
        <div className='max-w-7xl mx-auto px-4 py-12'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                    Kitchen Set Customizer
                </h1>
                <p className='text-xl text-gray-600'>
                    Design your perfect kitchen set and get instant pricing
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Customization Options */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Dimensions */}
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center mb-4'>
                            <Ruler className='w-6 h-6 text-primary-600 mr-3' />
                            <h2 className='text-2xl font-bold text-gray-900'>
                                Dimensions
                            </h2>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Width (cm)
                                </label>
                                <input
                                    type='number'
                                    min='100'
                                    max='600'
                                    value={dimensions.width}
                                    onChange={(e) =>
                                        setDimensions({
                                            ...dimensions,
                                            width:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Height (cm)
                                </label>
                                <input
                                    type='number'
                                    min='100'
                                    max='300'
                                    value={dimensions.height}
                                    onChange={(e) =>
                                        setDimensions({
                                            ...dimensions,
                                            height:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Depth (cm)
                                </label>
                                <input
                                    type='number'
                                    min='30'
                                    max='100'
                                    value={dimensions.depth}
                                    onChange={(e) =>
                                        setDimensions({
                                            ...dimensions,
                                            depth:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                />
                            </div>
                        </div>
                        <p className='text-sm text-gray-500 mt-3'>
                            Total area:{' '}
                            <span className='font-semibold'>
                                {totalArea.toFixed(2)} m²
                            </span>
                        </p>
                    </div>

                    {/* Material Selection */}
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center mb-4'>
                            <Package className='w-6 h-6 text-primary-600 mr-3' />
                            <h2 className='text-2xl font-bold text-gray-900'>
                                Material
                            </h2>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            {materials.map((material) => (
                                <button
                                    key={material.id}
                                    onClick={() =>
                                        setSelectedMaterial(material.id)
                                    }
                                    className={`
                                        p-4 rounded-lg border-2 transition-all
                                        ${
                                            selectedMaterial === material.id
                                                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200'
                                                : 'border-gray-200 hover:border-primary-300'
                                        }
                                    `}
                                >
                                    <div className='text-4xl mb-2'>
                                        {material.image}
                                    </div>
                                    <h3 className='font-semibold text-gray-900'>
                                        {material.name}
                                    </h3>
                                    <p className='text-sm text-gray-600'>
                                        Rp{' '}
                                        {material.pricePerSqm.toLocaleString(
                                            'id-ID'
                                        )}
                                        /m²
                                    </p>
                                    {selectedMaterial === material.id && (
                                        <div className='mt-2'>
                                            <Check className='w-5 h-5 text-primary-600 mx-auto' />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Finish Selection */}
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center mb-4'>
                            <Palette className='w-6 h-6 text-primary-600 mr-3' />
                            <h2 className='text-2xl font-bold text-gray-900'>
                                Finish
                            </h2>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            {finishes.map((finish) => (
                                <button
                                    key={finish.id}
                                    onClick={() => setSelectedFinish(finish.id)}
                                    className={`
                                        p-4 rounded-lg border-2 transition-all text-left
                                        ${
                                            selectedFinish === finish.id
                                                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200'
                                                : 'border-gray-200 hover:border-primary-300'
                                        }
                                    `}
                                >
                                    <h3 className='font-semibold text-gray-900'>
                                        {finish.name}
                                    </h3>
                                    <p className='text-sm text-gray-600'>
                                        {finish.priceModifier === 1.0
                                            ? 'Standard price'
                                            : `+${(
                                                  (finish.priceModifier - 1) *
                                                  100
                                              ).toFixed(0)}%`}
                                    </p>
                                    {selectedFinish === finish.id && (
                                        <div className='mt-2'>
                                            <Check className='w-5 h-5 text-primary-600' />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hardware Selection */}
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center mb-4'>
                            <DollarSign className='w-6 h-6 text-primary-600 mr-3' />
                            <h2 className='text-2xl font-bold text-gray-900'>
                                Hardware & Accessories
                            </h2>
                        </div>
                        <div className='space-y-3'>
                            {hardwareOptions.map((hardware) => (
                                <button
                                    key={hardware.id}
                                    onClick={() =>
                                        setSelectedHardware(hardware.id)
                                    }
                                    className={`
                                        w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between
                                        ${
                                            selectedHardware === hardware.id
                                                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200'
                                                : 'border-gray-200 hover:border-primary-300'
                                        }
                                    `}
                                >
                                    <div>
                                        <h3 className='font-semibold text-gray-900'>
                                            {hardware.name}
                                        </h3>
                                        <p className='text-sm text-gray-600'>
                                            Rp{' '}
                                            {hardware.price.toLocaleString(
                                                'id-ID'
                                            )}
                                        </p>
                                    </div>
                                    {selectedHardware === hardware.id && (
                                        <Check className='w-5 h-5 text-primary-600' />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Additional Services */}
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                            Additional Services
                        </h2>
                        <div className='space-y-3'>
                            <label className='flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-all'>
                                <div>
                                    <h3 className='font-semibold text-gray-900'>
                                        Professional Installation
                                    </h3>
                                    <p className='text-sm text-gray-600'>
                                        +15% of material cost
                                    </p>
                                </div>
                                <input
                                    type='checkbox'
                                    checked={includeInstallation}
                                    onChange={(e) =>
                                        setIncludeInstallation(e.target.checked)
                                    }
                                    className='w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500'
                                />
                            </label>
                            <label className='flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-all'>
                                <div>
                                    <h3 className='font-semibold text-gray-900'>
                                        Delivery Service
                                    </h3>
                                    <p className='text-sm text-gray-600'>
                                        Rp{' '}
                                        {deliveryCost.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <input
                                    type='checkbox'
                                    checked={includeDelivery}
                                    onChange={(e) =>
                                        setIncludeDelivery(e.target.checked)
                                    }
                                    className='w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500'
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Price Summary - Sticky Sidebar */}
                <div className='lg:col-span-1'>
                    <div className='sticky top-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-2xl p-6 text-white'>
                        <div className='flex items-center mb-6'>
                            <Calculator className='w-6 h-6 mr-3' />
                            <h2 className='text-2xl font-bold'>
                                Price Summary
                            </h2>
                        </div>

                        <div className='space-y-4 mb-6'>
                            <div className='flex justify-between pb-3 border-b border-primary-400'>
                                <span className='text-primary-100'>
                                    Material
                                </span>
                                <span className='font-semibold'>
                                    Rp {finishCost.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className='flex justify-between pb-3 border-b border-primary-400'>
                                <span className='text-primary-100'>
                                    Hardware
                                </span>
                                <span className='font-semibold'>
                                    Rp {hardwareCost.toLocaleString('id-ID')}
                                </span>
                            </div>
                            {includeInstallation && (
                                <div className='flex justify-between pb-3 border-b border-primary-400'>
                                    <span className='text-primary-100'>
                                        Installation
                                    </span>
                                    <span className='font-semibold'>
                                        Rp{' '}
                                        {installationCost.toLocaleString(
                                            'id-ID'
                                        )}
                                    </span>
                                </div>
                            )}
                            {includeDelivery && (
                                <div className='flex justify-between pb-3 border-b border-primary-400'>
                                    <span className='text-primary-100'>
                                        Delivery
                                    </span>
                                    <span className='font-semibold'>
                                        Rp{' '}
                                        {deliveryCost.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className='bg-white bg-opacity-20 rounded-lg p-4 mb-6'>
                            <div className='flex justify-between items-baseline'>
                                <span className='text-sm uppercase tracking-wide'>
                                    Total Price
                                </span>
                                <div className='text-right'>
                                    <div className='text-3xl font-bold'>
                                        Rp {Math.round(totalPrice / 1000000)}jt+
                                    </div>
                                    <div className='text-xs text-primary-100'>
                                        {totalPrice.toLocaleString('id-ID')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleRequestQuote}
                            variant='secondary'
                            fullWidth
                            className='bg-white text-primary-600 hover:bg-gray-100 font-bold py-3'
                        >
                            Request Quote
                        </Button>

                        <p className='text-xs text-primary-100 mt-4 text-center'>
                            * Prices are estimates. Final quote may vary based
                            on specific requirements.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
