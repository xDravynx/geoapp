const fetchExternalGeoData = async (latiture, longitude) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`External API responded with status: ${response.status}`);
    }
    
    return await response.json();
};

module.exports = {
    fetchExternalGeoData
};