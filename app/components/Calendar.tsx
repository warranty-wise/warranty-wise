'use client'
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

const Calendar = ({ setActiveComponent }: { setActiveComponent: (component: string) => void }) => {
    const supabase = createClient()
    interface Warranty {
        warranty_id: string
        product_name: string
        expiration_date: string
        product_manufacturer: string
    }

    const [data, setData] = useState<Warranty[]>([])

    const getWarranty = useCallback(async () => {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser()
            if (userError || !userData?.user) {
                throw new Error('User not authenticated')
            }
            const user_id = userData.user.id
            const { data, error, status } = await supabase
                .from('warranties')
                .select('warranty_id, product_name, expiration_date, product_manufacturer')
                .eq('user_id', user_id as string)

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setData(data)
            }
        } catch (error) {
            alert('Error loading warranty data!')
            return error
        }
    }, [supabase])

    useEffect(() => {
        getWarranty()
    }, [getWarranty]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getWarrantiesForMonth = (monthIndex: number) => {
        return data
            .filter(warranty => {
                const expirationDate = new Date(warranty.expiration_date);
                return expirationDate.getMonth() === monthIndex;
            })
            .sort((a, b) => {
                const dateA = new Date(a.expiration_date);
                const dateB = new Date(b.expiration_date);
                return dateA.getTime() - dateB.getTime();
            });
    };

    return (
        <div className="p-4 text-black">
            {/*<h1 className="text-2xl font-bold mb-4 text-black text-center">Warranty Calendar</h1>*/}
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4 text-black max-w-6xl">
                    {months.map((month, index) => (
                        <div key={month} className="border border-gray-400 text-black w-96 h-48 flex flex-col rounded-lg shadow-sm">
                            <h2 className="font-semibold p-2 text-black bg-gray-100 border-b border-gray-400 rounded-t-lg">{month}</h2>
                            <div className="overflow-auto p-2 flex-grow">
                                <ul>
                                    {getWarrantiesForMonth(index).map(warranty => (
                                        <li key={warranty.warranty_id} className="text-sm mb-1">
                                            <span className="font-medium text-black">{warranty.product_name}</span>
                                            <br />
                                            <span className="text-xs text-gray-500">
                                                Expires: {new Date(warranty.expiration_date).toLocaleDateString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Calendar;