//src/app/news/page.jsx
import NewsUI from '@/components/UI/newsUI';

export const metadata = {
    title: 'Financial News',
    description: 'Stay updated with the latest financial news and insights',
};

export default function NewsPage() {
    return (
        <main>
            <NewsUI />
        </main>
    );
}