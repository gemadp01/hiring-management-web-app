type TProvince = {
  id: string;
  name: string;
};

type TRegency = {
  id: string;
  province_id: string;
  name: string;
};

export const getCities = async (province: string) => {
  const provinces = await fetch(
    "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
  ).then((res) => res.json());

  const result = provinces.find((p: TProvince) => p.name === province);

  const cities = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${result.id}.json`
  ).then((res) => res.json());

  const finalResult = cities.map(
    (city: TRegency) => `${city.name} - ${result.name}`
  );
  return finalResult;
};
