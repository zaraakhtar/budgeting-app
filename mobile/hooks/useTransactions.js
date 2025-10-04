// react custom hook file.
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

const API_URL = "http://localhost:5001/api";

export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        balance: 0, 
        income: 0,
        expenses: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    //useCallback to memoize the function and avoid unnecessary re-renders

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data);
            
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userId]);


    //useCallback to memoize the function and avoid unnecessary re-renders

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            setSummary(data);
            
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);

        try {
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);

    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) throw new Error('Failed to delete transaction');

            loadData();
            Alert.alert("success", "Transaction deleted successfully");
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Alert.alert("error", error.message);
        }
    }

    return {
        transactions,
        summary,
        isLoading,
        loadData,
        deleteTransaction,
    };

}