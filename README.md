# Performance Profiling Report

## Overview

This document contains performance analysis results for the Climate Data Table application using React Dev Tools Profiler.

## Profiling Methodology

Profiling was conducted using React Dev Tools Profiler with the following settings:

- ✅ "Record why each component rendered while profiling" - Enabled
- ✅ "Hide commits below 0.1ms" - Enabled
- 🔄 Multiple iterations per test case for accurate results

## Test Scenarios

### 1. Column Sorting Interaction

**User Action**: Sort data by population

#### Flame Graph

<img width="832" height="181" alt="image" src="https://github.com/user-attachments/assets/041f6524-8c9b-45d9-98ec-970d51d28bcc" />

#### Ranked Chart

<img width="829" height="182" alt="image" src="https://github.com/user-attachments/assets/0bb7d8d5-035a-4c5f-8e3a-f5bb22f677c5" />

### 2. Country Search Operation

**User Action**: Type "United" in search field

#### Flame Graph

<img width="833" height="276" alt="image" src="https://github.com/user-attachments/assets/4bb40c7f-ff2a-43d2-9178-38d1a87d3fd9" />

#### Ranked Chart

<img width="830" height="202" alt="image" src="https://github.com/user-attachments/assets/be9d9ea2-47a4-4da2-ba50-ab3d415b7470" />

---

### 3. Year Selection Change

**User Action**: Select different year from dropdown

#### Flame Graph

<img width="831" height="151" alt="image" src="https://github.com/user-attachments/assets/2f43821b-bacd-4590-9c0a-7b40481f42f7" />

#### Ranked Chart

<img width="830" height="202" alt="image" src="https://github.com/user-attachments/assets/45db7f8b-b586-49b2-863b-9985845f3f31" />

### 4. Column Management

**User Action**: Open modal and toggle additional columns

#### Flame Graph

<img width="832" height="212" alt="image" src="https://github.com/user-attachments/assets/d614aa8e-2f30-4aae-8e45-5e0fb2e650d0" />

#### Ranked Chart

<img width="833" height="225" alt="image" src="https://github.com/user-attachments/assets/d0451c41-723d-4e61-b493-73f8f6d9a778" />

