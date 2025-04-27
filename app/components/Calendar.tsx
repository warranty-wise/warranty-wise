'use client'

import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
    const supabase = createClient();

    interface Warranty {
        warranty_id: string;
        product_name: string;
        expiration_date: string;
        product_manufacturer: string;
    }

    const [data, setData] = useState<Warranty[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const getWarranty = useCallback(async () => {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError || !userData?.user) {
                throw new Error('User not authenticated');
            }
            const user_id = userData.user.id;
            const { data, error, status } = await supabase
                .from('warranties')
                .select('warranty_id, product_name, expiration_date, product_manufacturer')
                .eq('user_id', user_id as string);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setData(data);
            }
        } catch (error) {
            alert('Error loading warranty data!');
            console.error(error);
        }
    }, [supabase]);

    useEffect(() => {
        getWarranty();
    }, [getWarranty]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getWarrantiesForMonth = (monthIndex: number) => {
        return data
            .filter(warranty => {
                const expirationDate = new Date(warranty.expiration_date);
                return (
                    expirationDate.getMonth() === monthIndex &&
                    expirationDate.getFullYear() === selectedYear
                );
            })
            .sort((a, b) => {
                const dateA = new Date(a.expiration_date);
                const dateB = new Date(b.expiration_date);
                return dateA.getTime() - dateB.getTime();
            });
    };

    const incrementYear = () => {
        setSelectedYear((prev) => prev + 1);
    };

    const decrementYear = () => {
        setSelectedYear((prev) => prev - 1);
    };

    return (
        <div className="p-6 text-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Warranty Expiration Calendar</h1>

            {/* Year Controller */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <button
                    onClick={decrementYear}
                    className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
                    aria-label="Previous Year"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="text-2xl font-semibold text-black">{selectedYear}</div>
                <button
                    onClick={incrementYear}
                    className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
                    aria-label="Next Year"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {months.map((month, index) => (
                    <div
                        key={month}
                        className="flex flex-col border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-4 bg-white"
                    >
                        <h2 className="text-lg font-semibold mb-3 text-black">{month}</h2>
                        <div className="flex-grow overflow-y-auto">
                            {getWarrantiesForMonth(index).length > 0 ? (
                                <ul className="space-y-3">
                                    {getWarrantiesForMonth(index).map(warranty => (
                                        <li key={warranty.warranty_id}>
                                            <div className="text-sm font-medium text-black">{warranty.product_name}</div>
                                            <div className="text-xs text-gray-500">
                                                Expires: {new Date(warranty.expiration_date).toLocaleDateString()}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No warranties expiring</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
