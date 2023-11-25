'use server'

const fs = require('fs')

export const saveToJsonFile = async (file: string, obj: any) => {
    fs.writeFile(file, JSON.stringify(obj), (err: any, data: any) => {
        if(err){
            console.log(err)
            return false
        }else{
            console.log(data)
            return true
        }
    });
}