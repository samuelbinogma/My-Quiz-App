import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { currentUser} = useAuth();
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const fetchScores = async () => {
                try {
                    const q = query(
                        collection(db, 'scores'),
                        where('userId', '==', currentUser.uid),
                        orderBy('timestamp', 'desc')
                    );
                    const querySnapshot = await getDocs(q);
                    const userScores = querySnapshot.docs.mmap(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        timestamp: doc.data().timestamp.toDate().toLocaleDateString()
                    }));
                    setScores(userScores);
                    setLoading(false);
                } catch (err) {
                    console.error('Failed to load scores:', err);
                    setLoading(false)
                }
            };
            fetchScores();
        }
    }, [currentUser]);

    if (!currentUser) {
        return <p>Please log in to see your history</p>
    }

    return (
        <div className="dashboard">
            <h2>Your Quiz History</h2>
            <p>Welcome back, {currentUser.email}</p>

            {loading ? (
                <p>Loading your scores...</p>
            ): scores.length === 0 ? (
                <p>No quizzes played yet. <Link to='/quiz'>Play your first quiz</Link></p>
            ) : (
                <div className="scores-list">
                    {scores.map((s) => (
                        <div key={s.id} className="score-card">
                            <p><strong>{s.score}/{s.total} ({s.percentage}%)</strong></p>
                            <p>Category: {s.category}</p>
                            <p>Difficulty: {s.difficulty}</p>
                            <p>Date: {s.timestamp}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 

export default Dashboard;