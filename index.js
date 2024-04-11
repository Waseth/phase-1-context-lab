// Function to create an employee record from an array
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Function to create employee records from an array of arrays
let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

// Function to add a time in event for an employee
let createTimeInEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord
}

// Function to add a time out event for an employee
let createTimeOutEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord
}

// Function to calculate hours worked on a specific date
let hoursWorkedOnDate = function(employeeRecord, soughtDate){
    let inEvent = employeeRecord.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employeeRecord.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

// Function to calculate wages earned on a specific date
let wagesEarnedOnDate = function(employeeRecord, dateSought){
    let rawWage = hoursWorkedOnDate(employeeRecord, dateSought) * employeeRecord.payPerHour
    return parseFloat(rawWage.toString())
}

// Function to calculate all wages for an employee
let allWagesFor = function(employeeRecord){
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return payable
}

// Function to find an employee by first name
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

// Function to calculate total payroll for an array of employee records
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}


























