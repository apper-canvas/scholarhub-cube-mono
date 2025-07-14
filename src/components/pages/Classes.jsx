import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ClassCard from "@/components/organisms/ClassCard";
import Modal from "@/components/organisms/Modal";
import ClassForm from "@/components/organisms/ClassForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useClasses } from "@/hooks/useClasses";

const Classes = () => {
  const { classes, loading, error, addClass, updateClass, deleteClass, loadClasses } = useClasses();
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [viewingClass, setViewingClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddClass = () => {
    setEditingClass(null);
    setShowModal(true);
  };

  const handleEditClass = (classData) => {
    setEditingClass(classData);
    setShowModal(true);
  };

  const handleViewClass = (classData) => {
    setViewingClass(classData);
  };

  const handleSubmitClass = async (classData) => {
    try {
      if (editingClass) {
        await updateClass(editingClass.Id, classData);
        toast.success("Class updated successfully!");
      } else {
        await addClass(classData);
        toast.success("Class added successfully!");
      }
      setShowModal(false);
      setEditingClass(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClass = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteClass(id);
        toast.success("Class deleted successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadClasses} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Classes
          </h1>
          <p className="text-gray-600 mt-2">Manage your classes and course information</p>
        </div>
        <Button onClick={handleAddClass}>
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search classes by name or subject..."
            className="flex-1 max-w-md"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredClasses.length} class{filteredClasses.length !== 1 ? "es" : ""}
            </span>
          </div>
        </div>

        {filteredClasses.length === 0 ? (
          <Empty
            title="No classes found"
            message="Get started by creating your first class."
            actionText="Add Class"
            onAction={handleAddClass}
            icon="BookOpen"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map(classItem => (
              <ClassCard
                key={classItem.Id}
                classData={classItem}
                onEdit={handleEditClass}
                onDelete={handleDeleteClass}
                onView={handleViewClass}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingClass ? "Edit Class" : "Add New Class"}
        size="lg"
      >
        <ClassForm
          classData={editingClass}
          onSubmit={handleSubmitClass}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <Modal
        isOpen={viewingClass !== null}
        onClose={() => setViewingClass(null)}
        title="Class Details"
        size="md"
      >
        {viewingClass && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {viewingClass.name}
              </h3>
              <p className="text-gray-600">{viewingClass.subject}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <p className="text-gray-900">{viewingClass.period}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <p className="text-gray-900">{viewingClass.room}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                <p className="text-gray-900">{viewingClass.term}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                <p className="text-gray-900">{viewingClass.studentIds?.length || 0} enrolled</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setViewingClass(null)}>
                Close
              </Button>
              <Button onClick={() => {
                setViewingClass(null);
                handleEditClass(viewingClass);
              }}>
                Edit Class
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Classes;