"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, CheckCircle2, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type BookingPopupProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const interestOptions = [
  {
    value: "lasik-prk",
    label: "LASIK / PRK",
    description: "Laser vision correction with WaveLight PLUS technology"
  },
  {
    value: "evo-icl",
    label: "EVO ICL",
    description: "Lens-based vision correction for myopia and astigmatism"
  },
  {
    value: "rle",
    label: "Refractive Lens Exchange (RLE)",
    description: "Lens replacement for age-related vision changes"
  },
  {
    value: "cataract",
    label: "Cataract Evaluation",
    description: "Advanced cataract surgery with premium lens options"
  },
  {
    value: "general",
    label: "General Consultation",
    description: "I would like to learn more before making a decision"
  },
]

export function BookingPopup({ open, onOpenChange }: BookingPopupProps) {
  const [step, setStep] = useState(1)
  const [interest, setInterest] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [consent, setConsent] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const progress = (step / 3) * 100

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleClose = () => {
    setStep(1)
    setSubmitted(false)
    onOpenChange(false)
  }

  const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-premium-lg">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold" style={{ color: "#1A202C" }}>
                  Schedule a Free Consultation
                </DialogTitle>
                <DialogDescription style={{ color: "#718096" }}>
                  Estimated time to complete: ~60 seconds
                </DialogDescription>
              </DialogHeader>

              {/* Progress Bar */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-sm" style={{ color: "#718096" }}>
                  <span>Step {step} of 3</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-[#C3D5E8]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "#3182CE" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Interest Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: "#1A202C" }}>
                        What are you interested in?
                      </h3>
                      <p className="text-sm mb-6" style={{ color: "#718096" }}>
                        Choose the treatment or information you would like to learn more about.
                      </p>

                      <RadioGroup value={interest} onValueChange={setInterest} className="space-y-3">
                        {interestOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`flex items-start space-x-4 p-5 rounded-2xl cursor-pointer transition-all ${
                              interest === option.value 
                                ? "bg-[#EBF4FC] border-2 border-[#3182CE] shadow-sm" 
                                : "border-2 border-[#C3D5E8] hover:border-[#3182CE]/50"
                            }`}
                            onClick={() => setInterest(option.value)}
                          >
                            <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                            <div className="flex-1">
                              <Label
                                htmlFor={option.value}
                                className="font-semibold cursor-pointer text-base"
                                style={{ color: "#1A202C" }}
                              >
                                {option.label}
                              </Label>
                              <p className="text-sm mt-1" style={{ color: "#718096" }}>
                                {option.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={!interest}
                      className="w-full font-semibold text-white rounded-full py-6 btn-premium disabled:opacity-50"
                      style={{ backgroundColor: "#3182CE" }}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Personal Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-6" style={{ color: "#1A202C" }}>
                        How can we reach you?
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" style={{ color: "#1A202C" }}>
                          First Name *
                        </Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          required 
                          className="rounded-xl border-[#C3D5E8] focus:border-[#3182CE]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" style={{ color: "#1A202C" }}>
                          Last Name *
                        </Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          required 
                          className="rounded-xl border-[#C3D5E8] focus:border-[#3182CE]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" style={{ color: "#1A202C" }}>
                        Email *
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="rounded-xl border-[#C3D5E8] focus:border-[#3182CE]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" style={{ color: "#1A202C" }}>
                        Phone *
                      </Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        className="rounded-xl border-[#C3D5E8] focus:border-[#3182CE]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" style={{ color: "#1A202C" }}>
                        Message (optional)
                      </Label>
                      <Textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        rows={3} 
                        className="rounded-xl border-[#C3D5E8] focus:border-[#3182CE]"
                      />
                    </div>

                    <div 
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: '#EBF4FC' }}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="consent"
                          checked={consent}
                          onCheckedChange={(checked) => setConsent(checked as boolean)}
                          className="mt-0.5"
                        />
                        <div>
                          <label htmlFor="consent" className="text-sm font-medium leading-tight cursor-pointer" style={{ color: "#1A202C" }}>
                            I agree to be contacted about my appointment. *
                          </label>
                          <p className="text-xs mt-1" style={{ color: "#718096" }}>
                            We only use your information to process your request.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleBack} 
                        variant="outline" 
                        className="flex items-center gap-2 bg-transparent rounded-full px-6"
                        style={{ borderColor: "#C3D5E8", color: "#1A202C" }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={!firstName || !lastName || !email || !phone || !consent}
                        className="flex-1 font-semibold text-white rounded-full py-6 btn-premium disabled:opacity-50"
                        style={{ backgroundColor: "#3182CE" }}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Time Selection */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: "#1A202C" }}>
                        Choose a time that works for you
                      </h3>
                      <p className="text-sm" style={{ color: "#718096" }}>
                        Select an available time slot.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#C3D5E8' }}>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold mb-3 block" style={{ color: "#1A202C" }}>
                          Available Times
                        </Label>
                        <div className="space-y-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              onClick={() => setSelectedTime(time)}
                              className={`w-full justify-start rounded-xl transition-all ${
                                selectedTime === time ? "shadow-sm" : ""
                              }`}
                              style={selectedTime === time 
                                ? { backgroundColor: "#3182CE", color: "white" } 
                                : { borderColor: "#C3D5E8", color: "#1A202C" }
                              }
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div 
                      className="text-center p-4 rounded-xl"
                      style={{ backgroundColor: '#EBF4FC' }}
                    >
                      <p className="text-sm font-medium" style={{ color: "#1A202C" }}>
                        Prefer to be called?
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#718096" }}>
                        We can contact you to discuss the best time.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleBack} 
                        variant="outline" 
                        className="flex items-center gap-2 bg-transparent rounded-full px-6"
                        style={{ borderColor: "#C3D5E8", color: "#1A202C" }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={!selectedTime}
                        className="flex-1 font-semibold text-white rounded-full py-6 btn-premium disabled:opacity-50"
                        style={{ backgroundColor: "#3182CE" }}
                      >
                        Submit Request
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: 'rgba(49, 130, 206, 0.15)' }}
              >
                <CheckCircle2 className="w-10 h-10" style={{ color: "#3182CE" }} />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-bold" style={{ color: "#1A202C" }}>
                  Request Received
                </h3>
                <p className="mt-2" style={{ color: "#718096" }}>
                  We will confirm your appointment shortly via email or phone.
                </p>
              </div>

              <div 
                className="rounded-2xl p-6 text-left space-y-3"
                style={{ backgroundColor: "#EBF4FC" }}
              >
                <h4 className="font-semibold" style={{ color: "#1A202C" }}>
                  Your Request Summary
                </h4>
                <div className="space-y-2 text-sm" style={{ color: "#718096" }}>
                  <p>
                    <strong className="text-[#1A202C]">Interest:</strong>{" "}
                    {interestOptions.find(o => o.value === interest)?.label || "General Consultation"}
                  </p>
                  <p>
                    <strong className="text-[#1A202C]">Location:</strong>{" "}
                    Eye Specialists and Surgeons of Northern Virginia
                  </p>
                  <p>
                    <strong className="text-[#1A202C]">Requested Time:</strong>{" "}
                    {selectedDate?.toLocaleDateString("en-US")} at {selectedTime}
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleClose} 
                className="font-semibold text-white rounded-full px-8 py-6 btn-premium"
                style={{ backgroundColor: "#3182CE" }}
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
