/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

export default function App() {
  const [candidates, setCandidates] = useState('');
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);

  const handleLottery = () => {
    const list = candidates.split('\n').filter(line => line.trim() !== '');
    if (list.length === 0) return;
    
    const count = Math.min(winnerCount, list.length);
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    setWinners(shuffled.slice(0, count));
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">抽選アプリ</h1>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows={5}
        placeholder="候補を改行区切りで入力"
        value={candidates}
        onChange={(e) => setCandidates(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="winnerCount">当選人数:</label>
        <input
          id="winnerCount"
          type="number"
          className="w-20 p-2 border border-gray-300 rounded"
          min={1}
          value={winnerCount}
          onChange={(e) => setWinnerCount(parseInt(e.target.value))}
        />
      </div>
      <button
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleLottery}
      >
        抽選する
      </button>
      {winners.length > 0 && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h2 className="font-bold text-green-800">当選者:</h2>
          <ul className="list-disc list-inside">
            {winners.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
