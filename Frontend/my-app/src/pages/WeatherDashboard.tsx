import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, Droplets, Wind, Eye, Gauge, ThermometerSun, Sunrise, 
  Sunset, MapPin, Calendar, TrendingUp, AlertTriangle, Leaf,
  CloudRain, Sun, Moon, CloudSnow, CloudDrizzle
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

interface WeatherData {
  location: string;
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    visibility: number;
    pressure: number;
    sunrise: string;
    sunset: string;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
  }>;
  alerts: Array<{
    type: 'monsoon' | 'heat' | 'frost' | 'wind';
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  plantCareAdvice: Array<{
    icon: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const MOCK_WEATHER: WeatherData = {
  location: 'Bangalore, Karnataka',
  current: {
    temp: 28,
    feelsLike: 30,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6,
    visibility: 10,
    pressure: 1013,
    sunrise: '6:15 AM',
    sunset: '6:30 PM',
  },
  forecast: [
    { day: 'Today', date: 'Mar 30', high: 30, low: 22, condition: 'Partly Cloudy', icon: 'partly-cloudy', precipitation: 10, humidity: 65 },
    { day: 'Tomorrow', date: 'Mar 31', high: 31, low: 23, condition: 'Sunny', icon: 'sunny', precipitation: 5, humidity: 60 },
    { day: 'Monday', date: 'Apr 1', high: 29, low: 21, condition: 'Rainy', icon: 'rainy', precipitation: 80, humidity: 75 },
    { day: 'Tuesday', date: 'Apr 2', high: 27, low: 20, condition: 'Rainy', icon: 'rainy', precipitation: 70, humidity: 80 },
    { day: 'Wednesday', date: 'Apr 3', high: 28, low: 21, condition: 'Partly Cloudy', icon: 'partly-cloudy', precipitation: 30, humidity: 70 },
    { day: 'Thursday', date: 'Apr 4', high: 30, low: 22, condition: 'Sunny', icon: 'sunny', precipitation: 10, humidity: 60 },
    { day: 'Friday', date: 'Apr 5', high: 31, low: 23, condition: 'Sunny', icon: 'sunny', precipitation: 5, humidity: 58 },
  ],
  alerts: [
    {
      type: 'monsoon',
      title: 'Pre-Monsoon Showers Expected',
      description: 'Heavy rainfall predicted in the next 48 hours. Ensure proper drainage for your plants.',
      severity: 'medium',
    },
    {
      type: 'heat',
      title: 'High UV Index',
      description: 'UV index reaching 6+. Provide shade to sensitive plants during peak afternoon hours.',
      severity: 'medium',
    },
  ],
  plantCareAdvice: [
    {
      icon: '💧',
      title: 'Adjust Watering Schedule',
      description: 'With rain expected, reduce watering frequency for the next 2-3 days to avoid overwatering.',
      priority: 'high',
    },
    {
      icon: '🌤️',
      title: 'Provide Afternoon Shade',
      description: 'High temperatures and UV levels. Move sensitive plants to partial shade between 12 PM - 4 PM.',
      priority: 'medium',
    },
    {
      icon: '🍃',
      title: 'Check Drainage',
      description: 'Ensure pots have proper drainage holes. Remove excess water trays before heavy rain.',
      priority: 'high',
    },
    {
      icon: '🌿',
      title: 'Fertilize Before Rain',
      description: 'Good time to add organic fertilizer. Rain will help nutrients reach roots naturally.',
      priority: 'low',
    },
  ],
};

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case 'sunny': return <Sun className="w-full h-full text-yellow-400" />;
    case 'partly-cloudy': return <Cloud className="w-full h-full text-blue-300" />;
    case 'rainy': return <CloudRain className="w-full h-full text-blue-400" />;
    case 'cloudy': return <Cloud className="w-full h-full text-gray-400" />;
    default: return <Sun className="w-full h-full text-yellow-400" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-white/10 text-white/60 border-white/20';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-red-500/30';
    case 'medium': return 'border-yellow-500/30';
    case 'low': return 'border-blue-500/30';
    default: return 'border-white/10';
  }
};

export const WeatherDashboard = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const weather = MOCK_WEATHER;

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="text-premium">Weather & Climate</span>
            </h1>
            <Button className="glass border border-white/10 text-white hover:bg-white/10">
              <MapPin className="w-4 h-4 mr-2" />
              Change Location
            </Button>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{weather.location}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Current Weather - Large Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glass p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Current Weather</h2>
                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Updated Just Now
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Temperature & Icon */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="w-24 h-24">
                      {getWeatherIcon(weather.current.icon)}
                    </div>
                    <div>
                      <p className="text-7xl font-bold text-white">{weather.current.temp}°</p>
                      <p className="text-white/60">Feels like {weather.current.feelsLike}°</p>
                    </div>
                  </div>
                  <p className="text-2xl text-white/80 mb-2">{weather.current.condition}</p>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg glass">
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                      <Droplets className="w-5 h-5" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{weather.current.humidity}%</p>
                  </div>

                  <div className="p-4 rounded-lg glass">
                    <div className="flex items-center gap-2 mb-2 text-cyan-400">
                      <Wind className="w-5 h-5" />
                      <span className="text-sm">Wind</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{weather.current.windSpeed} km/h</p>
                  </div>

                  <div className="p-4 rounded-lg glass">
                    <div className="flex items-center gap-2 mb-2 text-yellow-400">
                      <Sun className="w-5 h-5" />
                      <span className="text-sm">UV Index</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{weather.current.uvIndex}</p>
                  </div>

                  <div className="p-4 rounded-lg glass">
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                      <Eye className="w-5 h-5" />
                      <span className="text-sm">Visibility</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{weather.current.visibility} km</p>
                  </div>
                </div>
              </div>

              {/* Sun Times */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-orange-500/20">
                    <Sunrise className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Sunrise</p>
                    <p className="text-white font-semibold text-lg">{weather.current.sunrise}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <Sunset className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Sunset</p>
                    <p className="text-white font-semibold text-lg">{weather.current.sunset}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Weather Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Card className="glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Weather Alerts
              </h3>
              <div className="space-y-3">
                {weather.alerts.map((alert, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <h4 className="font-semibold mb-2">{alert.title}</h4>
                    <p className="text-sm opacity-80">{alert.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-400" />
                Air Quality
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">AQI</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Good (45)
                  </Badge>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[45%]" />
                </div>
                <p className="text-sm text-white/60">
                  Air quality is satisfactory and poses little or no risk to your plants.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* 7-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="glass p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              7-Day Forecast
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.forecast.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  className={`p-4 rounded-xl transition-all text-center ${
                    selectedDay === idx
                      ? 'glass border-2 border-primary bg-primary/10'
                      : 'glass-hover border border-white/10'
                  }`}
                >
                  <p className="text-white font-semibold mb-2">{day.day}</p>
                  <p className="text-white/60 text-sm mb-3">{day.date}</p>
                  <div className="w-12 h-12 mx-auto mb-3">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-white font-bold">{day.high}°</span>
                    <span className="text-white/40">/{day.low}°</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-blue-400 text-sm">
                    <Droplets className="w-3 h-3" />
                    <span>{day.precipitation}%</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Plant Care Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              Weather-Based Plant Care Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weather.plantCareAdvice.map((advice, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl glass-hover border-2 ${getPriorityColor(advice.priority)}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{advice.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{advice.title}</h4>
                        <Badge className={getSeverityColor(advice.priority)}>
                          {advice.priority} priority
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{advice.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
