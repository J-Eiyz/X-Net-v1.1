import  { MapPin, User, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="relative">
        <div className="h-80 w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1591978638709-bd73f437243d" 
            alt="Beyblade Battle" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Beyblade X Community</h1>
            <p className="text-lg max-w-2xl">Connect with bladers worldwide, join tournaments, and share your best combos</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Upcoming Events
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex space-x-3">
                  <div className="flex-shrink-0 w-14 h-14 bg-gray-800 rounded-md overflow-hidden flex items-center justify-center text-center">
                    <div>
                      <div className="text-xs font-medium text-gray-400">{event.month}</div>
                      <div className="text-lg font-bold text-white">{event.day}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <div className="text-sm text-gray-400 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
              <a href="#" className="block text-center text-sm text-blue-500 hover:text-blue-400 mt-2">
                View all events
              </a>
            </div>
          </div>
          
          {/* Top Bladers */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Top Bladers
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {topBladers.map((blader, index) => (
                  <div key={blader.id} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-800 mr-3 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-white">{blader.username}</span>
                        <span className="text-blue-500 text-sm">{blader.points} pts</span>
                      </div>
                      <div className="text-xs text-gray-400">{blader.specialty}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="block text-center text-sm text-blue-500 hover:text-blue-400 mt-4">
                View full rankings
              </a>
            </div>
          </div>
          
          {/* Join Community */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Join Our Community</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-4">Connect with fellow bladers, join tournaments, and showcase your best combos.</p>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-3 rounded-md transition-colors">
                  <span className="text-white">Discord Channel</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </a>
                <a href="#" className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-3 rounded-md transition-colors">
                  <span className="text-white">Facebook Group</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </a>
                <a href="#" className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-3 rounded-md transition-colors">
                  <span className="text-white">Tournament Sign-ups</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data
const events = [
  {
    id: 1,
    title: 'X-Net Regional Championship',
    month: 'JUN',
    day: '12',
    location: 'Tokyo, Japan'
  },
  {
    id: 2,
    title: 'Beyblade X Online Tournament',
    month: 'JUN',
    day: '15',
    location: 'Online Event'
  },
  {
    id: 3,
    title: 'X-Tower Memorial Battle',
    month: 'JUN',
    day: '28',
    location: 'New York, USA'
  }
];

const topBladers = [
  {
    id: 1,
    username: 'BeyMaster99',
    points: 2875,
    specialty: 'Attack Type Specialist'
  },
  {
    id: 2,
    username: 'StadiumKing',
    points: 2640,
    specialty: 'Balance Type Expert'
  },
  {
    id: 3,
    username: 'SpinExpert',
    points: 2420,
    specialty: 'Stamina Type Champion'
  },
  {
    id: 4,
    username: 'BladeChampion',
    points: 2250,
    specialty: 'Custom Combo Creator'
  },
  {
    id: 5,
    username: 'DragonSlayer',
    points: 2110,
    specialty: 'Defense Type Tactician'
  }
];
 