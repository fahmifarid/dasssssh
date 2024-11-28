import React from 'react';

interface WindCompassProps {
  speed: number;
  direction: string;
}

const WindCompass: React.FC<WindCompassProps> = ({ speed, direction }) => {
  const getRotation = () => {
    const directions: Record<string, number> = {
      'N': 0, 'NE': 45, 'E': 90, 'SE': 135,
      'S': 180, 'SW': 225, 'W': 270, 'NW': 315
    };
    return directions[direction] || 0;
  };

  return (
    <div className="bg-navy-800 rounded-lg p-4">
      <h3 className="text-gray-400 text-sm mb-4">Wind Speed & Direction</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-2 border-gray-600 rounded-full">
            {['N', 'E', 'S', 'W'].map((dir, i) => (
              <div
                key={dir}
                className="absolute text-gray-400 text-sm"
                style={{
                  top: dir === 'N' ? '0' : dir === 'S' ? 'calc(100% - 1rem)' : 'calc(50% - 0.5rem)',
                  left: dir === 'W' ? '0' : dir === 'E' ? 'calc(100% - 1rem)' : 'calc(50% - 0.5rem)',
                }}
              >
                {dir}
              </div>
            ))}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${getRotation()}deg)` }}
            >
              <div className="w-1 h-16 bg-blue-500 transform -translate-y-2" />
            </div>
          </div>
        </div>
        <div className="mt-4 text-2xl font-bold text-white">{speed} m/s</div>
        <div className="text-gray-400">{direction}</div>
      </div>
    </div>
  );
};

export default WindCompass;