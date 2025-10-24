const Booking = require('../models/Booking');
exports.createBooking = async (req, res, next) => {
  const { guru, skill, startTime, endTime, totalAmount } = req.body;
  try {
     // Razorpay logic ko poori tarah hata dein.
     const bookingfind = await Booking.findOne({
   shishya: req.user.id,
   skill,
   guru,
 });
if (bookingfind) {
   return res.status(400).json({ message: "You have already booked this skill." });
 }
 
    const booking = await Booking.create({
      shishya: req.user.id,
      guru,
      skill,
      startTime,
      endTime,
      totalAmount,
      status: 'Confirmed', // ✅ Seedhe confirmed!
      paymentDetails: {
        paymentStatus: 'Paid (Bypassed)', // Ek note ki payment bypass hua hai
      }
    });

    // Sirf booking object wapas bhejein
    res.status(201).json({ booking });

  } catch (error) {
    console.error("Error creating direct booking:", error);
    next(error);
  }
};

// verifyPaymentAndUpdateBooking function ki ab zaroorat nahi hai,
// lekin use rakha jaa sakta hai agar aap baad mein payment add karna chahein.
exports.verifyPaymentAndUpdateBooking = async (req, res, next) => {
    res.status(200).json({ message: "Verification not needed for direct booking." });
};

// getMyBookings waise hi kaam karega
exports.getMyBookings = async (req, res, next) => {
    try {
        // --- DEBUGGING ---
        console.log(`Fetching bookings for user ID: ${req.user.id}`);
        
        const bookings = await Booking.find({ shishya: req.user.id })
            .populate('guru', 'name avatar') // Guru ki details laayein
            .populate('skill', 'title');   // Skill ki details laayein

        if (!bookings) {
            console.log("No bookings found for this user in database.");
            return res.status(200).json([]);
        }

        console.log(`Found ${bookings.length} booking(s) for the user.`);
        // --- END DEBUGGING ---

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching my bookings:", error);
        next(error);
    }
};
exports.getGuruBookings = async (req, res, next) => {
    try {
        const guruId = req.user.id;
        const bookings = await Booking.find({ guru: guruId })
            .populate('shishya', 'name avatar') 
            .populate('skill', 'title')     
            .sort({ createdAt: -1 });        

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching Guru's bookings:", error);
        next(error);
    }
};
