import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Dog appl</title>
            </Head>

            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ? (
                        <Link
                            href="/home"
                            className="ml-4 text-sm text-gray-700 underline">
                            ホーム
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm text-gray-700 underline">
                                ログイン
                            </Link>

                            <Link
                                href="/register"
                                className="ml-4 text-sm text-gray-700 underline">
                                新規登録
                            </Link>
                        </>
                    )}
                </div>
                
                <img src='/doglog2.png' />
                <div>
                                            Dog App
                </div>
            </div>
            
        </>
    )
}
