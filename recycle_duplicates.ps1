Add-Type -AssemblyName Microsoft.VisualBasic
$ErrorActionPreference = 'Stop'
$count = 0
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_A_Eligibility_and_Consent_Checklist (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_B_Treatment-Day_Timeout_and_Administration_Record (2).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_B_Treatment-Day_Timeout_and_Administration_Record (4).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_B_Treatment-Day_Timeout_and_Administration_Record (5).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_B_Treatment-Day_Timeout_and_Administration_Record (3).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_C_Vital-Signs_Monitoring_Sheet (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_D_Adverse_Event_SAE_Form (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_E_Product_Accountability_and_Cold-Chain_Log (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_F_ViaNase_Device_Log (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_F_ViaNase_Device_Log (2).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_G_Hormone_Optimization_Decision_Worksheet (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_H_Follow-Up_Visit_Form (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Appendix_I_Caregiver_Daily_Observation_Diary (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Dementia_ADDSB_Clinical_Protocol_DualRoute_v1.0 (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Patient_Consent_and_Agreement (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Patient_Information_Sheet (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Patient_Information_Sheet (2).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Standardized_Clinical_Protocol_Dementia_ADDSB_DualRoute_v1.0 (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\Atunse_Standardized_Clinical_Protocol_Dementia_ADDSB_DualRoute_v1.0 (2).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("C:\Users\hp\Desktop\KLM2026\ATUNSHE\WorkingDocs\CSDH_Combination_Hypothesis_v1_Atunse (1).docx", "OnlyErrorDialogs", "SendToRecycleBin"); $count++
Write-Host "RECYCLED $count FILES"