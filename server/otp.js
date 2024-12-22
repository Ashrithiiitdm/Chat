export const content = ({ name, otp }) => {
    return `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                @media only screen and (max-width: 600px) {
                    div[style*="min-width:1000px"] {
                        min-width: auto !important;
                        width: 90% !important;
                    }

                    h2 {
                        font-size: 1.5em !important;
                        padding: 10px !important;
                    }
                }
            </style>
        </head>

        <body>
            <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0;">

                    <p style="font-size: 1.1em;">Hi ${name},</p>
                    <p>Thank you for choosing us, use the following OTP to complete your verification. OTP is
                        valid for 10 minutes</p>
                    <h2
                        style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">
                        ${otp}
                    </h2>
                    <p style="font-size: 0.9em;">Regards,<br />Chat app</p>
                    <hr style="border: none; border-top: 1px solid #eee;" />

                </div>
            </div>
        </body>

        </html>`;

};