let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let router = express.Router();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api',bodyParser.json(), router)   //[Use json]
app.use('/api',bodyParser.urlencoded({ extended: false}),router);

let students = [  { 'no': 0, 'id': "5935512001", 'name': "Nadat" ,'surname':"Kugimiya" ,'Major':"CoE", 'GPA':3.32},
                  { 'no': 1, 'id': "5831512018", 'name': "Yaya",'surname':"Urassaya"  ,'Major':"FHT",'GPA':3.90}
               ];

//router.route('/students').get((req, res) =>  res.json(students) );               
router.route('/students')     
               .get((req,res) => res.json(students))

               .post((req,res)=>{
                   let student = {}
                   student.no = students[students.length-1].no+1
                   student.id = req.body.id
                   student.name = req.body.name
                   student.surname = req.body.surname
                   student.Major = req.body.Major
                   student.GPA = req.body.GPA
                   students.push(student)
                   res.json({message: 'Student Created!'})
               });
router.route('/students/:student_id')
               .get((req,res)=>{
                   let no = req.params.student_id
                   let index = students.findIndex(student =>(student.no === +no))
                   res.json(students[index])
               })
               //update a student
               .put((req,res)=>{
                   let no = req.params.student_id
                   let index = students.findIndex(student =>(student.no === +no))
                   students[index].id = req.body.id;
                   students[index].name = req.body.name;
                   students[index].surname = req.body.surname;
                   students[index].Major = req.body.Major;
                   students[index].GPA = req.body.GPA;
                   res.json({message: 'Student updated!'+ req.params.student_id});
               })
               //delete a students
               .delete((req,res)=>{
                   // delete     students[req.params.student_no]
                   let no = req.params.student_id
                   let index = students.findIndex(student =>(student.no === +no))
                   students.splice(index,1)
                   res.json({message: 'Student deleted!'+ req.params.student_id});
               })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, ()=>{console.log('Server is runing')})