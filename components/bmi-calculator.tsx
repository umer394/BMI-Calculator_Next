"use client"
import { Label } from "./ui/label"
import { useState,ChangeEvent } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface BmiResult {
    bmi: string;
    category: string;
}

export default function BmiCalculator(){
    const [height,setHeight] = useState<string>("")
    const [weight,setWeight] = useState<string>("")
    const [result,setResult] = useState<BmiResult|null>(null)
    const [error,setError] = useState<string>("")

    const handleHeightchange = (e:ChangeEvent<HTMLInputElement>):void=>{
        setHeight(e.target.value)
    }

    const handleWeightchange = (e:ChangeEvent<HTMLInputElement>):void=>{
        setWeight(e.target.value)
    }

    const calculateBmi = ():void =>{
        if(!height || !weight){
            setError("Please enter both height and weight")
            return
        }

        const heightInMeters = parseFloat(height) / 100
            if(heightInMeters <= 0){
                setError("Height must be a positive number.")
                return
            }
            const weightInKg = parseFloat(weight)
            if (weightInKg <= 0) {
                setError("Weight must be a positive number.");
                return;
            }

            const bmiValue = weightInKg / (heightInMeters * heightInMeters)
            let category = "";
            if (bmiValue < 18.5) {
                category = "Underweight";
            } else if (bmiValue >= 18.5 && bmiValue < 25) {
                category = "Normal";
            } else if (bmiValue >= 25 && bmiValue < 30) {
                category = "Overweight";
            } else {
                category = "Obese";
            }

            setResult({bmi: bmiValue.toFixed(1),category})
            setError("")
    }

    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>BMI Calculator</CardTitle>
                    <CardDescription> Enter your height and weight to calculate your BMI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                        id="height"
                        placeholder="Enter your height"
                        type="number"
                        value={height}
                        onChange={handleHeightchange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Weight">Weight (Kg)</Label>
                        <Input
                        id="Weight"
                        placeholder="Enter your Weight"
                        type="number"
                        value={weight}
                        onChange={handleWeightchange}
                        />
                    </div>
                    <Button
                    onClick={calculateBmi} 
                    >
                        Calculate
                    </Button>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    {result && (
                        <div className="grid gap-2">
                            <div className="text-center texr-2xl font-bold">{result.bmi}</div>
                            <div className="text-center text-muted-foreground">{result.category}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}