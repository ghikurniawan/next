'use client'

// @ts-ignore 

import { saveToJsonFile } from '@/lib/FS';
import React, { useEffect, useState } from 'react';

interface JsonData {
  [key: string]: JsonData | string | number | any;
}

const JsonEditor: React.FC<{data : string}> = ({data}) => {
  const [jsonData, setJsonData] = useState<JsonData>(JSON.parse(data));
  const [items, setItems] = useState<Array<any>>([])
  const [id, setId] = useState<String | any>('W1001')
  const [property, setProperty] = useState<String | any>('D')
  const [value, setValue] = useState<String>('$80.00')


  const initial = () => {
      Object.keys(jsonData).forEach((keyO) => {
        Object.keys(jsonData[keyO]).forEach((keyU) => {
          Object.keys(jsonData[keyO][keyU]).forEach((keyM) => {
            Object.keys(jsonData[keyO][keyU][keyM]).forEach((keyA) => {
              Object.keys(jsonData[keyO][keyU][keyM][keyA]).forEach((keyN) => {
                Object.keys(jsonData[keyO][keyU][keyM][keyA][keyN]).forEach((keyV) => {
                  Object.keys(jsonData[keyO][keyU][keyM][keyA][keyN][keyV]).forEach((keyQ) => {
                    setItems([jsonData[keyO][keyU][keyM][keyA][keyN][keyV]])
                  });
                });
              });
            });
          });
        });
      });
  };
  
  useEffect(() => {
    initial()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    console.log(id)
    console.log(property)
  }, [id, property])

  const ubahNilaiD = () => {
    setJsonData((prevData) => {
      const newData: JsonData = { ...prevData };
      Object.keys(newData).forEach((keyO) => {
        Object.keys(newData[keyO]).forEach((keyU) => {
          Object.keys(newData[keyO][keyU]).forEach((keyM) => {
            Object.keys(newData[keyO][keyU][keyM]).forEach((keyA) => {
              Object.keys(newData[keyO][keyU][keyM][keyA]).forEach((keyN) => {
                Object.keys(newData[keyO][keyU][keyM][keyA][keyN]).forEach((keyV) => {
                  Object.keys(newData[keyO][keyU][keyM][keyA][keyN][keyV]).forEach((keyQ) => {
                    console.log('kunci id', keyQ)
                    if (newData[keyO][keyU][keyM][keyA][keyN][keyV][id].hasOwnProperty(property)) {
                      newData[keyO][keyU][keyM][keyA][keyN][keyV][id][property] = value;
                    }
                  });
                });
              });
            });
          });
        });
      });

      if(process.env.NODE_ENV === 'development'){
        saveToJsonFile('./data/data-1.json', newData)
      }
      
      return newData;
    });
  };

  return (
    <>
    <div className='w-full flex flex-col gap-4 max-w-md'>
      <h2>Update JSON</h2>
      <div>
        <label htmlFor="key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Id</label>
        <select id="key" onChange={(e) => setId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultValue={'Q1001'}>Select Item For Edit</option>
          {items.map((item, index) => (
              Object.keys(item).map((i =>(
                <option key={i} value={i} >{i} {item[i]['C']}</option>
              )))
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="key2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an property</label>
        <select id="key2" onChange={(e) => setProperty(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultValue={'D'}>Select Property</option>
          {items.map((item) => (
              Object.keys(item).slice(1,2).map((i => (
                Object.keys(item[i]).map((a) => (
                  <option key={a} value={a} >{a}</option>
                ))
              )))
          ))}
        </select>
      </div>
      <div>
      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Value</label>
      <input onChange={(e) => setValue(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Value" required/>
      </div>
      <button onClick={ubahNilaiD} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
    </div>
    <div className=' overflow-x-scroll w-full'>
      <pre className='w-full text-xs'>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
    </>
  );
};

export default JsonEditor;
