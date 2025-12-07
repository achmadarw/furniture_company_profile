import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import ProductCategories from '@/components/sections/ProductCategories';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';
import Stats from '@/components/sections/Stats';

export default function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <Features />
            <ProductCategories />
            <FeaturedProjects />
            <Process />
            <Testimonials />
            <CallToAction />
        </>
    );
}
